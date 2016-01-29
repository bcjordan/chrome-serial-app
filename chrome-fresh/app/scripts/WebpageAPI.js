/**
 * Interface for webpages to interact with
 * TODO(bjordan): May need layer to pass through Chrome message/connection API?
 */
export default class WebpageAPI {
  constructor(extensionController) {

  }

  /**
   * Executes the given code (if possible)
   * @param {String} javascriptCode
   */
  runCode(javascriptCode) {
    console.log(`Running code ${javascriptCode}`);
  }
}


