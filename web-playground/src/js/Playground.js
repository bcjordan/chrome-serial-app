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

    SerialPortFactory.isInstalled((err) => {
      if (err) {
        console.log(err);
      }
      this.board = new this.five.Board({
        /**
         * Disabling REPL for now, relies on process.stdin and require('repl')
         * does not browserify.
         */
        repl: false
      });
      // board.on('ready' -> set some sort of state to ready
      // board.on('error' -> forward errors to user

      console.log("Chrome extension installed! Trying to init board.");
    });
  }

  runCode(code) {
    try {
      //execute user's script
      this.runCodeWithParams(code, {
        five: this.five,
        board: this.board
      });
    }
    catch (e) {
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
