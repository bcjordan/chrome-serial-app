/* global $ */

import SerialPortFactory from 'chrome-serialport';
import five from 'johnny-five';
import {chromeExtensionId} from './chromeConnectorConfig';

export default class J5BridgeClient {
  constructor() {
    this.serialPort = SerialPortFactory.SerialPort;
    SerialPortFactory.extensionId = chromeExtensionId;

    this.five = five;

    this.board = null;

    SerialPortFactory.isInstalled((err) => {
      if (err) {
        console.log(err);
      }
      console.log("Chrome extension installed! Trying to init board.");


    });
  }
}

window.J5BridgeClient = J5BridgeClient;
