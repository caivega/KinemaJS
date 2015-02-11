module.exports = function(grunt) {
  // commonjs to module for browser
  grunt.loadNpmTasks('grunt-browserify')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-connect')
  grunt.loadNpmTasks('grunt-contrib-watch')

  grunt.initConfig({
    connect: {
      dev: {
        options: {
          port: 9090,
          hostname: 'localhost',
          base: 'gh-pages/dev/',
          livereload: true
        },
        middleware: function(connect, options) {
          return [
            require('grunt-contrib-livereload/lib/utils').livereloadSnippet,
            connect.static(options.base)
          ];
        }
      },
      prod: {
        options: {
          port: 9099,
          hostname: 'localhost',
          base: 'gh-pages/prod/',
          livereload: true
        }
      },
    },
    watch: {
      options: {
        livereload: true
      },
      'scripts-dev': {
        files: ['src/**/*.js'],
        tasks: ['browserify:dev']
      },
      'scripts-prod': {
        files: ['src/**/*.js'],
        tasks: ['browserify:prod', 'uglify:prod']
      },
      'copy-dev': {
        files: ['src/gh-pages/index.html'],
        tasks: ['copy:dev']
      },
      'copy-prod': {
        files: ['src/gh-pages/index.html'],
        tasks: ['copy:prod']
      }
    },
    browserify: {
      dev: {
        src: 'src/gh-pages/js/main.js',
        dest: 'gh-pages/dev/js/main.js'
      },
      prod: {
        src: 'src/gh-pages/js/main.js',
        dest: 'gh-pages/prod/js/main.js'
      }
    },
    uglify: {
       prod: {
        files: {
          'gh-pages/prod/js/main.js': ['gh-pages/prod/js/main.js']
        }
      }
    },
    copy: {
      'html-dev': {
        expand: true,
        cwd: 'src/gh-pages/',
        src: ['index.html'],
        dest: 'gh-pages/dev/',
      },
      'html-prod': {
        expand: true,
        cwd: 'src/gh-pages/',
        src: ['index.html'],
        dest: 'gh-pages/prod/',
      },
    }
  });

  grunt.registerTask('copy:dev', ['copy:html-dev']);
  grunt.registerTask('copy:prod', ['copy:html-prod']);
  grunt.registerTask('build:dev', ['copy:dev', 'browserify:dev']);
  grunt.registerTask('build:prod', ['copy:prod', 'browserify:prod', 'uglify:prod']);
  grunt.registerTask('server:dev', ['build:dev', 'connect:dev', 'watch']);
  grunt.registerTask('server:prod', ['build:prod', 'connect:prod', 'watch']);

};