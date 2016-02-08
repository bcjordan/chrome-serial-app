Work-in-progress Website (Johnny-Five) -> Chrome App -> Serial playground.

# Setup

To start, install `npm`, and run `npm install` in the top level directory and both project directories.

1. Install node and npm. Most recently tested with node v0.12.7 and npm v2.9.1
1. `npm install`
1. `cd chrome-fresh && npm install && cd ..`
1. `cd web-playground && npm install && cd ..`

# Running code

## Development mode

2. `grunt`

This will start a development server for the playground page, launch Google Chrome with the Chrome App running, and live-reload both on changes.

Test "levels" can be edited in `web-playground/src/test-build-only/levels.js`

## Building both [& optional deploy to S3]

1. `npm install`
2. `grunt deploy [--name=my-test-deploy]`
  * This will generate a `.crx` suitable for uploading to the Chrome webstore.
  * If s3 credentials are configured, the test playground page with a link to the .crx will be uploaded to the specified s3 folder.
 
