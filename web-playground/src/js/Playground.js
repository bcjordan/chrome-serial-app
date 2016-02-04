/* global $ */

import SerialPortFactory from 'chrome-serialport';
import five from 'johnny-five';
import {chromeExtensionId} from './chromeConnectorConfig';

class Playground {
  constructor() {
    window.serialPort = SerialPortFactory.SerialPort;
    SerialPortFactory.extensionId = chromeExtensionId;

    this.five = five;

    this.board = null;

    this.prewiredComponents = {
      ledRGB: null,
      led: null,
      temperature: null,
      microphone: null,
      button: null,
      lightSensor: null,
      led4: null,
      led5: null,
      led6: null,
      led7: null,
      led8: null,
      thermometer: null,
      light: null,
      slider: null
    };

    SerialPortFactory.isInstalled((err) => {
      if (err) {
        console.log(err);
      }
      console.log("Chrome extension installed! Trying to init board.");

      this.board = new this.five.Board({
        /**
         * Disabling REPL for now, relies on process.stdin and require('repl')
         * does not browserify.
         */
        repl: false
      });

      this.board.on('ready', () => {
        this.prewiredComponents.ledRGB = new five.Led.RGB({
          pins: {red: 9, green: 10, blue: 11}
        });
        this.prewiredComponents.thermometer = new five.Thermometer({
          pin: "A0"
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
          this.prewiredComponents.led8,
        ];
        this.prewiredComponents.slider = new five.Sensor("A3");
        this.prewiredComponents.microphone = new five.Sensor("A2");
        this.prewiredComponents.light = new five.Sensor({
          pin: "A1",
          freq: 250
        });
        this.prewiredComponents.button = new five.Button("12");
      });

      this.board.on('error', () => {

      });
    });
  }

  runCode(code) {
    try {
      var codeParams = {
        five: this.five,
        board: this.board
      };
      $.extend(codeParams, this.prewiredComponents);
      this.runCodeWithParams(code, codeParams);
    } catch (e) {
      console.log(e, 'danger');
    }
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
}

window.Playground = Playground;
