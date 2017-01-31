'use strict';

module.exports = function (grunt) {
  const buildConfig = require('./build-config.js');
  const pemFile = buildConfig.chrome_signing_pem.replace('~', process.env['HOME']);

  require('load-grunt-tasks')(grunt);

  const deployBuild = grunt.cli.tasks.length && grunt.cli.tasks[0] === 'deploy';

  const pluginFolder = require('path').resolve() + '/dist';

  const manifest = grunt.file.readJSON('app/manifest.json');
  const packagePrefix = 'package/CDOSerialTest-' + (deployBuild ? parseInt(manifest.version, 10) + 1 : manifest.version);

  // Define the configuration for all the tasks
  grunt.initConfig({
    browserify: {
      app: {
        src: [deployBuild ?
          'app/scripts/ExtensionController.js' :
          'app/scripts/DevExtensionController.js'
        ],
        dest: 'dist/scripts/app.bundled.js',
        options: {
          transform: [
            'babelify'
          ],
          watch: true,
          browserifyOptions: {
            // Adds inline source map to bundled package
            debug: !deployBuild,
          },
        }
      }
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['app/scripts/{,*/}*.js'],
        tasks: ['browserify', 'copy'],
        options: {
          livereload: {
            port: 35730
          }
        }
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            'dist/*',
            'package/*',
          ]
        }]
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        'app/scripts/{,*/}*.js',
        '!app/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'app',
          dest: 'dist',
          src: [
            '*.{ico,png,txt}',
            'manifest.json',
            'images/{,*/}*.{webp,gif,png}',
            'styles/fonts/{,*/}*.*',
            '_locales/{,*/}*.json',
            '{,*/}*.js'
          ]
        }]
      },
    },

    concurrent: {
      chromeOpenLiveReload: ['exec:appOpen', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    },

    // Update build number, potentially exclude given script
    chromeManifest: {
      dist: {
        options: {
          buildnumber: true,
          background: {
            target: 'scripts/app.bundled.js',
          }
        },
        src: 'app',
        dest: 'dist'
      }
    },

    // Compress files in dist to make installable Chrome Apps package
    compress: {
      dist: {
        options: {
          archive: function () {
            return packagePrefix + '.zip';
          }
        },
        files: [{
          expand: true,
          cwd: 'dist/',
          src: ['**'],
          dest: ''
        }]
      }
    },

    // Generates .crx bundle signed with pemfile
    crx: {
      dist: {
        "src": "dist/**/*",
        "dest": packagePrefix + '.crx',
        "options": {
          "privateKey": pemFile,
        }
      }
    },

    exec: {
      appOpen: {
        cmd: `~/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --load-and-launch-app="${pluginFolder}"`
      },
      checkPemSpecified: {
        cmd: function () {
          if (!!pemFile) {
            throw 'No .pem signing file path specified.';
          }
          return true;
        }
      }
    }
  });

  grunt.registerTask('checkPemSpecified', 'Confirms .pem file is specified, complaining if not.',
    function () {
      if (pemFile) {
        return true;
      }

      grunt.log.writeln('Create a .pem file at https://developer.chrome.com/extensions/packaging#creating');
      grunt.log.writeln('And link to it in build-config.js');
      return false;
    });

  grunt.registerTask('build', [
    'clean:dist',
    'browserify',
    'copy'
  ]);

  grunt.registerTask('deploy', [
    'checkPemSpecified',
    'chromeManifest:dist',
    'build',
    'compress:dist',
    'crx:dist'
  ]);

  grunt.registerTask('default', [
    'build',
    'concurrent:chromeOpenLiveReload'
  ]);
};
