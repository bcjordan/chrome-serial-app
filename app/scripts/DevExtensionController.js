/*global chrome*/

/**
 * Entry point for live-reloading Chrome App development.
 */

import ChromeSerialBridge from './ChromeSerialBridge'
import AppLiveReloader from './AppLiveReloader'

window.chromeSerialBridge = new ChromeSerialBridge(chrome);
window.liveReloader = new AppLiveReloader({
  chromeRuntime: chrome.runtime,
  host: 'localhost',
  port: 35730
});
