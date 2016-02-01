/*global chrome*/

import AppLiveReloader from './AppLiveReloader' // TODO(bjordan): only if dev mode
import WebpageAPI from './WebpageAPI'
import ChromeSerialBridge from './ChromeSerialBridge'

export default class ExtensionController {
  constructor() {
    console.log("Extension controller initialized.");

    this.webpageAPI = new WebpageAPI(this);

    this.liveReloader = new AppLiveReloader({
      chromeRuntime: chrome.runtime,
      host: 'localhost',
      port: 35729
    });

    this.chromeSerialBridge = new ChromeSerialBridge(chrome);
  }
}

window.extensionController = new ExtensionController();
