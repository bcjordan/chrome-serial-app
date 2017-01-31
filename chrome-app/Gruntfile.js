'use strict';

module.exports = function (grunt) {
  var deployBuild = !!(grunt.cli.tasks.length && grunt.cli.tasks[0] === 'distribute');
  var deployName = deployBuild && 'deploy';

  var buildConfig = require('../build-config.js');
  var pemFile = buildConfig.chrome_signing_pem.replace('~', process.env['HOME']);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  //require('time-grunt')(grunt);

  var path = require('path');
  var pluginFolder = path.resolve() + '/dist';

  // Configurable paths
  var config = {
    app: 'app',
    dist: 'dist',
    package: 'package',
    tasks: grunt.cli.tasks,
    pluginFolder: pluginFolder
  };

  var manifest = grunt.file.readJSON('app/manifest.json');
  var packagePrefix = 'package/CDOSerialTest-' + (deployName || manifest.version);

  console.log(config.pluginFolder);
  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    project: {
      src: 'app/scripts',
      js: '<%= project.src %>/{,*/}*.js',
      dest: 'build/js',
      bundle: 'dist/scripts/app.bundled.js',
      bundleURL: 'scripts/app.bundled.js',
    },

    browserify: {
      app: {
        src: [deployBuild ?
          '<%= project.src %>/ExtensionController.js' :
          '<%= project.src %>/DevExtensionController.js'
        ],
        dest: '<%= project.bundle %>',
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
        files: ['<%= config.app %>/scripts/{,*/}*.js'],
        tasks: ['browserify', 'copy'],
        options: {
          livereload: true
        }
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: 35729 // TODO(bjordan): provide to grunt?
        },
        files: [
          '<%= config.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= config.app %>/manifest.json',
          '<%= config.app %>/_locales/{,*/}*.json'
        ]
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= config.dist %>/*',
            '<%= config.package %>/*',
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
        '<%= config.app %>/scripts/{,*/}*.js',
        '!<%= config.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
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
        src: '<%= config.app %>',
        dest: '<%= config.dist %>'
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
        cmd: '~/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --load-and-launch-app="<%= config.pluginFolder %>"'
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
      if (!pemFile) {
        grunt.log.writeln('Create a .pem file at https://developer.chrome.com/extensions/packaging#creating');
        grunt.log.writeln('And link to it in ../build-config.json');
        return false;
      }
      return true;
    });

  grunt.registerTask('build', [
    //'newer:jshint', // TODO(bjordan): Add back.
    'clean:dist',
    'browserify',
    'copy'
  ]);

  grunt.registerTask('distribute', [
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
