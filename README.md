Chrome App-based Serial Connector for the Code Studio Maker APIs.

# Setup

To start, install `npm`, and run `npm install`.

1. Install node and npm. Most recently tested with node v0.12.7 and npm v2.9.1
1. `npm install`

# Running code

## Development mode

1. `grunt`

This will launch Google Chrome with your Chrome App running, and live-reload it on file changes.

If you are using a chrome serial connector client (like `chrome-serial`, be sure to update the extension ID specified to the ID that Chrome assigns your extension (found in chrome://extensions).

## Building a .crx for distribution

1. `npm install`
1. Specify the path to a .pem file to sign the Chrome App in `build-config.js`, following instructions from [this Chrome page](https://developer.chrome.com/extensions/packaging#creating).
1. `grunt deploy`
  * This will generate a `.crx` suitable for uploading to the Chrome web store, and place it at `package/CDOSerialTest-NN.crx`, where `NN` is the manifest version number of the Chrome App.
  * WARNING: If you deploy a Chrome App with a manifest.json that has added new permissions, some users may accidentally uninstall the app when being prompted about its permissions. Be careful and test the upgrade with a local version if making permissions changes (removing permissions should be fine and not require a prompt, though).
