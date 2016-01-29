import AppLiveReloader from './AppLiveReloader' // TODO(bjordan): only if dev mode
import WebpageAPI from './WebpageAPI'

export default class ExtensionController {
  constructor() {
    console.log("Extension controller initialized.");

    this.webpageAPI = new WebpageAPI(this);

    this.liveReloader = new AppLiveReloader({
      chromeRuntime: chrome.runtime,
      host: 'localhost',
      port: 35729
    });
  }
}

chrome.app.runtime.onLaunched.addListener(function () {
  window.extensionController = new ExtensionController();
});
