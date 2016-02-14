/**
 * When running `grunt`, provides a live dev server at localhost:3017.
 * More details in ./README.md.
 */

var devBuildConfig = require('./dev-build-config.js');
var buildConfig = require('../build-config.js');

module.exports = function (grunt) {
  var deployBuild = !!(grunt.cli.tasks.length && grunt.cli.tasks[0] === 'distribute');
  var liveReloadPort = deployBuild ? false : devBuildConfig.liveReloadPort;

  if (deployBuild) {
    grunt.loadNpmTasks('grunt-contrib-uglify');
  }

  // Bundles up `require`s in javascript
  grunt.loadNpmTasks('grunt-browserify');

  // Copies assets over
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Watches for changes, re-triggers build & live-reloads
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Runs static webserver serving build folder
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Opens webpage with server on first build
  grunt.loadNpmTasks('grunt-open');

  // Simple templates (used on Code.org)
  grunt.loadNpmTasks('grunt-ejs');

  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-template');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    project: {
      src: 'src',
      js: '<%= project.src %>/{,*/}*.js',
      dest: 'build/js',
      bridgeClientBundle: 'build/js/bridge.bundled.js',
      playgroundBundle: 'build/js/app.bundled.js',
      bundleURL: 'js/app.bundled.js',
      port: devBuildConfig.port
    },
    /**
     * Runs static a static webserver
     */
    connect: {
      dev: {
        options: {
          port: '<%= project.port %>',
          base: './build'
        }
      }
    },
    jshint: {
      files: ['gruntfile.js', '<%= project.js %>'],
      options: {jshintrc: '.jshintrc'}
    },
    watch: {
      options: {livereload: liveReloadPort},
      js: {files: '<%= project.dest %>/**/*.js', tasks: []},
      assets: {files: 'src/assets/**/*', tasks: ['copy:assets']},
      style: {files: 'src/style/**/*', tasks: ['copy:style']},
      testBuildOnly: {
        files: 'src/test-build-only/**/*',
        tasks: ['copy:testBuildOnly']
      },
      ejs: {files: 'src/**/*.ejs', tasks: ['ejs']}
    },
    ejs: {
      all: {
        cwd: 'src/',
        src: ['**/*.ejs', '!node_modules/**/*'],
        dest: 'build/',
        expand: true,
        ext: '.html',
        options: {
          liveReloadPort: liveReloadPort,
          appBundle: '<%= project.bundleURL %>',
          getFingerprint: function () {
            return +(new Date());
          }
        }
      }
    },
    browserify: {
      app: {
        src: ['<%= project.src %>/js/Playground.js'],
        dest: '<%= project.playgroundBundle %>',
        options: {
          transform: [
            'babelify'
          ],
          watch: true,
          browserifyOptions: {
            // Adds inline source map to bundled package
            debug: !deployBuild
          }
        }
      },
      bridge: {
        src: ['<%= project.src %>/js/J5BridgeClient.js'],
        dest: '<%= project.bridgeClientBundle %>',
        options: {
          transform: [
            'babelify'
          ],
          watch: true,
          browserifyOptions: {
            // Adds inline source map to bundled package
            debug: !deployBuild
          }
        }
      }
    },
    template: {
      chromeExtensionIdTemplate: {
        options: {
          data: {
            chromeExtensionId: deployBuild ?
                buildConfig.chrome_deploy_extension_id :
                buildConfig.chrome_dev_extension_id
          }
        },
        files: {
          'src/js/chromeConnectorConfig.js': ['src/js/chromeConnectorConfig.js.tpl']
        }
      }
    },
    exec: {
      /**
       * TODO(bjordan): find nicer way of handling this swap-out — perhaps
       * package up new verison of j5/firmata with this?
       */
      replaceSerialPortFirmata: {
        cmd: 'sed -i.bak s/browser-serialport/chrome-serialport/g firmata.js',
        cwd: 'node_modules/johnny-five/node_modules/firmata/lib'
      },
      replaceSerialPortJ5: {
        cmd: 'sed -i.bak s/require\\(\\"serialport\\"\\)/require\\(\\"chrome-serialport\\"\\)/g board.js',
        cwd: 'node_modules/johnny-five/lib'
      }
    },
    open: {
      server: {path: 'http://localhost:<%= project.port %>'},
    },
    clean: ['./build/'],
    copy: {
      assets: {
        files: [{
          expand: true,
          cwd: 'src/assets/',
          src: ['**'],
          dest: 'build/assets/'
        }]
      },
      testBuildOnly: {
        files: [{
          expand: true,
          cwd: 'src/test-build-only/',
          src: ['**'],
          dest: 'build/test-build-only/'
        }]
      },
      style: {
        files: [{
          expand: true,
          cwd: 'src/style/',
          src: ['**'],
          dest: 'build/style/'
        }]
      }
    },
    uglify: {
      build: {
        src: '<%= project.playgroundBundle %>',
        dest: '<%= project.playgroundBundle %>'
      }
    }
  });

  grunt.registerTask('default', [
    'build',
    'connect',
    'open:server',
    'watch'
  ]);

  grunt.registerTask('distribute', [
    'build',
    'uglify',
  ]);

  grunt.registerTask('package', [
    'clean',
    'exec:replaceSerialPortFirmata',
    'exec:replaceSerialPortJ5',
    'browserify:app',
    'template:chromeExtensionIdTemplate',
    'browserify:bridge',
    'ejs',
    'copy'
  ]);

  grunt.registerTask('build', [
    'clean',
    'exec:replaceSerialPortFirmata',
    'exec:replaceSerialPortJ5',
    'browserify:app',
    'template:chromeExtensionIdTemplate',
    'browserify:bridge',
    'ejs',
    'copy'
  ]);
};
