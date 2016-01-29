/**
 * When running `grunt`, provides a live dev server at localhost:3017.
 * More details in ./README.md.
 */

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  var deployBuild = !!(grunt.cli.tasks.length && grunt.cli.tasks[0] === 'deploy');
  var deployName = grunt.option("name") || "unnamed";

  grunt.initConfig({
    aws: deployBuild ? grunt.file.readJSON('../../.secrets/aws-keys.json') : {},
    aws_s3: {
      options: {
        access: 'public-read',
        accessKeyId: '<%= aws.AWSAccessKeyId %>',
        secretAccessKey: '<%= aws.AWSSecretKey %>',
        uploadConcurrency: 20,
        downloadConcurrency: 20,
        region: 'us-west-1',
        gzip: true
      },
      test: {
        options: {
          bucket: 'cdo-j5-test',
          differential: true
        },
        files: [
          {
            expand: true,
            cwd: 'web-playground/build/',
            src: ['**'],
            dest: deployName + '/'
          },
          {
            expand: true,
            cwd: 'chrome-fresh/package/',
            src: ['CDOSerialTest-deploy.zip'],
            dest: deployName + '/'
          },
          {
            expand: true,
            cwd: 'chrome-fresh/package/',
            src: ['CDOSerialTest-deploy.crx'],
            dest: deployName + '/'
          },
        ]
      }
    },
    concurrent: {
      devBoth: ['exec:devChromeApp', 'exec:devWebPlayground'],
      options: {
        logConcurrentOutput: true
      }
    },
    open: {
      deployed: {
        path: 'https://s3-us-west-1.amazonaws.com/cdo-j5-test/' + deployName + '/index.html'
      }
    },
    exec: {
      buildChromeApp: {
        cmd: 'grunt distribute',
        cwd: 'chrome-fresh'
      },
      buildWebPlayground: {
        cmd: "grunt distribute",
        cwd: 'web-playground'
      },
      devChromeApp: {
        cmd: 'grunt',
        cwd: 'chrome-fresh'
      },
      devWebPlayground: {
        cmd: "grunt",
        cwd: 'web-playground'
      }
    }
  });

  grunt.registerTask('deploy', [
    'exec:buildChromeApp',
    'exec:buildWebPlayground',
    'aws_s3:test',
    'open:deployed'
  ]);

  grunt.registerTask('default', [
    'concurrent:devBoth'
  ]);
};
