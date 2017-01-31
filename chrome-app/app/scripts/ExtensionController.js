/*global chrome*/

import ChromeSerialBridge from './ChromeSerialBridge'

export default class ExtensionController {
  constructor() {
    this.chromeSerialBridge = new ChromeSerialBridge(chrome);
  }
}

window.extensionController = new ExtensionController();
