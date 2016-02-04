Work-in-progress Website (Johnny-Five) -> Chrome App -> Serial playground.

# Tasks

## Development mode

1. `npm install`
2. `grunt`

This will start a development server for the playground page, launch Google Chrome with the Chrome App running, and live-reload both on changes. 

## Building both [& optional deploy to S3]

1. `npm install`
2. `grunt deploy [--name=my-test-deploy]`
  * This will generate a `.crx` suitable for uploading to the Chrome webstore.
  * If s3 credentials are configured, the test playground page with a link to the .crx will be uploaded to the specified s3 folder.
 
