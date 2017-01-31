/*global chrome*/

import ExtensionController from './ExtensionController'
import AppLiveReloader from './AppLiveReloader'

export default class DevExtensionController {
  constructor() {
    this.liveReloader = new AppLiveReloader({
      chromeRuntime: chrome.runtime,
      host: 'localhost',
      port: 35729
    });
  }
}

window.devExtensionController = new DevExtensionController();
