import './chromereload' // TODO(bjordan): only if dev mode
import WebpageAPI from './WebpageAPI'

export default class ExtensionController {
  constructor() {
    console.log("Extension controller initialized.");

    this.webpageAPI = new WebpageAPI(this);


  }
}

window.extensionController = new ExtensionController();



