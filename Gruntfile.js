module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    nodemon: {
      dev: {
        options: {
          file: 'app.js',
          nodeArgs: ['--debug'],
          env: {
            PORT: '8282'
          }
        }
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          growl: 'true'
        },
        src: ['test/**/*.js']
      }
    },
    watch: {
      scripts: {
        files: ['./test/*.js', './*.js'],
        tasks: ['mochaTest']
      },
    }
  });

  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['nodemon', 'watch']);

};