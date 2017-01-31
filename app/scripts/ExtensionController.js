/*global chrome*/

/**
 * Entry point for published Chrome App.
 */

import ChromeSerialBridge from './ChromeSerialBridge'

window.chromeSerialBridge = new ChromeSerialBridge(chrome);
