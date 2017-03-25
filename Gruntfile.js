module.exports = function (grunt) {

  grunt.initConfig({
    browserify: {
      bundle: {
        options: {
          transform: [
            ['babelify', {'presets': ['es2015']}]
          ]
        },
        files: {
          'dist/bundle.js': [
            'src/index.js'
          ]
        }
      },
      vendor: {
        options: {
          transform: [
            ['babelify', {'presets': ['es2015']}]
          ]
        },
        files: {
          'dist/vendor.js': [
            'node_modules/angular/angular.js',
            'node_modules/angular-route/angular-route.js',
            'node_modules/angular-animate/angular-animate.js',
            'node_modules/ng-mask/dist/ngMask.js',
            'node_modules/material-design-lite/material.js'
          ]
        }
      }
    },
    uglify: {
      options: {mangle: false},
      vendor: {
        files: {'dist/vendor.min.js': ['dist/vendor.js']}
      },
      bundle: {
        files: {'dist/bundle.min.js': ['dist/bundle.js']}
      }
    },
    cssmin: {
      build: {
        files: {'dist/style.min.css': [
          'node_modules/material-design-lite/material.css',
          'src/**/*.css'
        ]}
      }
    },
    watch: {
      scripts: {
        files: ['src/**/*.js'],
        tasks: ['browserify:bundle']
      },
      bundle: {
        files: ['dist/bundle.js'],
        tasks: ['uglify:bundle']
      },
      styles: {
        files: ['src/**/**/*.css'],
        tasks: ['cssmin:build']
      },
      options: {livereload: true}
    },
    connect: {
      server: {options: {port: 9001, hostname: 'localhost', livereload: true}}
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', [
    'browserify:vendor',
    'browserify:bundle',
    'uglify:vendor',
    // 'uglify:bundle',
    'cssmin:build',
    'connect',
    'watch'
  ]);

  grunt.registerTask('build', [
    'browserify:vendor',
    'browserify:bundle',
    'uglify:vendor',
    'uglify:bundle',
    'cssmin:build'
  ]);

};
