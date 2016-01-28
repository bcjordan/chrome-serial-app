'use strict';

module.exports = function (grunt) {

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
    tasks: grunt.cli.tasks,
    pluginFolder: pluginFolder
  };

  console.log(config.pluginFolder);
  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['<%= config.app %>/scripts/{,*/}*.js'],
        tasks: ['copy'],
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
            target: 'scripts/background.js',
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
            var manifest = grunt.file.readJSON('app/manifest.json');
            return 'package/CDOSerialTest-' + manifest.version + '.zip';
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

    exec: {
      appOpen: {
        cmd: '~/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --load-and-launch-app="<%= config.pluginFolder %>"'
      }
    }
  });

  // TODO(bjordan): add watch task, maybe build & watch task?
  // maybe combine gruntfiles?

  grunt.registerTask('build', [
    //'newer:jshint',
    'clean:dist',
    'copy',
  ]);

  grunt.registerTask('distribute', [
    'chromeManifest:dist',
    'build',
    'compress:dist'
  ]);

  grunt.registerTask('dev', [
    'build',
    'concurrent:chromeOpenLiveReload'
  ]);
};
