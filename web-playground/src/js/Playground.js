/* global $ */

import SerialPortFactory from 'chrome-serialport';
import five from 'johnny-five';

class Playground {
  constructor() {
    window.serialPort = SerialPortFactory.SerialPort;
    // TODO(bjordan): Make configurable or pull out from Chrome API
    // TODO(bjordan): conditional based on local or remote?
    SerialPortFactory.extensionId = 'hclkodmlbbhiknnciphlcnbkglgjakmd'; // dev: himpmjbkjeenflliphlaaeggkkanoglo

    this.five = five;

    this.board = null;

    this.prewiredComponents = {
      ledRGB: null,
      led: null,
      temperature: null,
      microphone: null,
      button: null,
      lightSensor: null,
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
          pins: { red: 9, green: 10, blue: 11}
        });
        this.prewiredComponents.led = new five.Led(13);
        this.prewiredComponents.slider = new five.Sensor("A3");
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
