/* global $ */

import J5BridgeClient from './J5BridgeClient';

export default class Playground {
  constructor() {
    this.bridgeClient = new J5BridgeClient();
  }
  runCode(code) {
    this.bridgeClient.runCode(code);
  }
}

if (typeof window !== 'undefined') {
  window.Playground = Playground;
}
