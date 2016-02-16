To start, you'll need to install the required NPM dependencies:

    npm install

And you should now be ready to spin up a development build of your new project:

    grunt
    
A browser should open with the playground page displayed.

## Resources 

### Browserify

[Substack's Browserify Handbook](https://github.com/substack/browserify-handbook).

## Available Targets

### `grunt`

Configures and runs an un-minified development build optimised for fast watch performance with source maps and live reload. Opens browser window pointing to a test page on first build.

## Updating or adding libraries

You can add new npm-compatible libraries with:

`npm install --save my-package-name`

Then require it in your code with e.g. `var MyCoolTimesavingLibrary = require('My-Cool-Timesaving-Library')`.

If adding new libraries that aren't CommonJS compatible, you'll have to additionally update the [Browserify shim configuration](https://github.com/thlorenz/browserify-shim#3-provide-browserify-shim-config) in `package.json`.

### Coding style

Try to follow the [Code.org Javascript styleguide](https://github.com/code-dot-org/code-dot-org/blob/staging/STYLEGUIDE.md#javascript).

### Acknowledgements

Boilerplate initially based on the [Phaser.js grunt/browserify boilerplate](https://github.com/lukewilde/phaser-js-boilerplate/), which was based on [1](https://github.com/luizbills/phaser-js-boilerplate) and [2](https://github.com/gamecook/phaser-project-template).
