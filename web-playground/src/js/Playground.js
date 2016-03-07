/* global $ */

import J5BridgeClient from './J5BridgeClient';
import {list, SerialPort} from 'chrome-serialport';
import PlaygroundIO from 'playground-io';

/**
 * Required for browserified Johnny-Five Piezo support.
 */
global.setImmediate = require('timers').setImmediate;
process.hrtime = require('browser-process-hrtime');

var HARD_RESET = false;

export default class Playground {
  constructor() {
    this.bridgeClient = new J5BridgeClient();
    this.prewiredComponents = null;

    this.intervals = [];
    this.timeouts = [];
  }

  runCode(code) {
    try {
      var runForPort = () => {
        var serialPort = this.serialPort || new SerialPort(this.boardId, {
              baudrate: 57600
            }, true);
        var io = this.io || new PlaygroundIO({
          port: serialPort
        });
        this.io = io;
        this.serialPort = serialPort;
        var five = this.bridgeClient.five;

        var hadBoard = !!this.currentBoard;
        var board = this.currentBoard || new five.Board({
              /**
               * Disabling REPL for this use case, relies on process.stdin and
               * require('repl') does not browserify.
               */
              repl: false,
              io: io
            });
        this.currentBoard = board;

        var runBoardCode = () => {
          this.setupPrewiredPlayground(five);

          //board.on('error', () => {
          //});

          var codeParams = {
            five: this.five,
            board: board,
            /**
             * Override setInterval/setTimeout so we can stop them.
             * In full Applab IDE, interpreter cleans these up itself.
             */
            setInterval: (...args) => {
              var interval = window.setInterval(...args);
              this.intervals.push(interval);
              return interval;
            },
            setTimeout: (...args) => {
              var timeout = window.setTimeout(...args);
              this.timeouts.push(timeout);
              return timeout;
            }
          };
          $.extend(codeParams, this.prewiredComponents);

          console.log('Running code.');
          this.runCodeWithParams(code, codeParams);
        };

        hadBoard ? runBoardCode() : board.on('ready', () => {
          runBoardCode()
        });
      };

      if (!this.boardId) {
        list((e, list) => {
          var prewiredBoards = list.filter((port) => {
            if (!port.manufacturer) {
              return false;
            }
            var isCircuitPlayground = port.manufacturer.match(/LilyPad/);
            var isDigitalSandbox = port.manufacturer.match(/FT232R USB UART/);
            return (isCircuitPlayground || isDigitalSandbox);
          });
          if (prewiredBoards.length > 0) {
            this.boardId = prewiredBoards[0].comName;
          }
          runForPort();
        });
      } else {
        runForPort();
      }
    } catch (e) {
      console.log(e, 'danger');
    }
  }

  setupPrewiredPlayground(five) {
    if (this.prewiredComponents) {
      return;
    }
    this.prewiredComponents = {};
    this.prewiredComponents.pixels = Array.from({length: 10}, function (_, index) {
          return new five.Led.RGB({
            controller: PlaygroundIO.Pixel,
            pin: index
          });
        });
    this.prewiredComponents.led = new five.Led(13);

    this.prewiredComponents.buttonL = new five.Button('4', {
          isPullup: true,
          invert: true
        });

    this.prewiredComponents.buttonR = new five.Button('19', {
          isPullup: true,
          invert: true
        });

    this.prewiredComponents.toggle = new five.Switch('21');

    this.prewiredComponents.piezo = new five.Piezo({pin: '5', controller: PlaygroundIO.Piezo})

    this.prewiredComponents.thermometer = new five.Thermometer({
      controller: "TINKERKIT",
      pin: "A0",
      freq: 100
    });
  }

  setupPrewiredSandbox(five) {
    if (this.prewiredComponents) {
      return;
    }
    this.prewiredComponents = {};
    this.prewiredComponents.ledRGB = new five.Led.RGB({
          pins: {red: 9, green: 10, blue: 11}
        });
    this.prewiredComponents.thermometer = new five.Thermometer({
          pin: 'A0'
        });
    this.prewiredComponents.led = new five.Led(13);
    this.prewiredComponents.led4 = new five.Led(4);
    this.prewiredComponents.led5 = new five.Led(5);
    this.prewiredComponents.led6 = new five.Led(6);
    this.prewiredComponents.led7 = new five.Led(7);
    this.prewiredComponents.led8 = new five.Led(8);
    this.prewiredComponents.ledBar = [
      this.prewiredComponents.led4,
      this.prewiredComponents.led5,
      this.prewiredComponents.led6,
      this.prewiredComponents.led7,
      this.prewiredComponents.led8
    ];
    this.prewiredComponents.slider = new five.Sensor('A3');
    this.prewiredComponents.microphone = new five.Sensor('A2');
    this.prewiredComponents.light = new five.Sensor({
          pin: 'A1',
          freq: 250
        });
    this.prewiredComponents.button = new five.Button('12');
  }

  runCodeWithParams(code, options) {
    // execute JS code "natively"
    var params = [];
    var args = [];
    for (var k in options) {
      params.push(k);
      args.push(options[k]);
    }
    params.push(code);
    var ctor = function () {
      return Function.apply(this, params);
    };
    ctor.prototype = Function.prototype;
    return new ctor().apply(null, args);
  }

  resetCode() {
    this.intervals.forEach((i) => clearInterval(i));
    this.intervals.length = 0;
    this.timeouts.forEach((i) => clearTimeout(i));
    this.timeouts.length = 0;

    if (this.currentBoard) {
      this.currentBoard.register.forEach(function (component) {
        // "Soft" purge, otherwise io error on board.
        try {
          if (component.stop) {
            component.stop();
          }
          if (component.state && component.state.intervalId) {
            clearInterval(component.state.intervalId);
          } else if (component.state && component.state.interval) {
            clearInterval(component.state.interval);
          }

          if (component.off) {
            component.off();
          }

          if (component.removeAllListeners) {
            component.removeAllListeners();
          }

          if (HARD_RESET) {
            component.io = null;
            component.board = null;
          }
        } catch (error) {
          console.log('error trying to cleanup component', error);
        }

      });
      console.log("Reset. Not closing board port.");
      if (HARD_RESET) {
        this.bridgeClient.five.Board.purge();

        this.serialPort.close((e) => {
          if (e) {
            console.log(`Error closing serial port: ${e}`);
            return;
          }

          console.log("Closed serial port");
          this.serialPort = null;
          this.currentBoard.io = null;
          this.currentBoard = null;
        });
      }
    }
  }
}

if (typeof window !== 'undefined') {
  window.Playground = Playground;
}
