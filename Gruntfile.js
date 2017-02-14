module.exports = (grunt) => {

  const srcJSFiles = [
    'node_modules/material-design-lite/material.js',
    'node_modules/jquery/dist/jquery.js',
    'node_modules/angular/angular.js',
    'node_modules/angular-route/angular-route.js',
    'node_modules/angular-animate/angular-animate.js',
    'src/js/app.js',
    'src/js/controllers/cards.controller.js',
    'src/js/controllers/addCard.controller.js',
    'src/js/services/cardsAPI.service.js',
    'src/js/services/idGenerator.service.js',
    'src/js/configs/route.config.js'
  ];

  const srcCSSFiles = [
    'node_modules/material-design-lite/material.css',
    'src/css/app.css',
    'src/css/cards.css',
    'src/css/add-cards.css',
    'src/css/balance.css'
  ];

  grunt.initConfig({
    copy: {
      imgs: {
        files: [{
          expand: true,
          cwd: 'src/images',
          src: ['*'],
          dest: 'dist/images'
        }]
      },
      views: {
        files: [{
          expand: true,
          cwd: 'src/views',
          src: ['*.html'],
          dest: 'dist/views'
        }]
      }
    },
    uglify: {
      options: {mangle: false},
      build: {files: {'dist/app.min.js': srcJSFiles}}
    },
    cssmin: {build: {files: {'dist/app.min.css': srcCSSFiles}}},
    concat: {
      js: {src: srcJSFiles , dest: 'dist/app.min.js'},
      css: {src: srcCSSFiles, dest: 'dist/app.min.css'}
    },
    watch: {
      js: {files: srcJSFiles, tasks: ['concat:js']},
      css: {files: srcCSSFiles, tasks: ['concat:css']},
      html: {files: ['./*html', 'src/views/*html'], tasks: ['copy:views']},
      options: {livereload: true}
    },
    connect: {
      server: {options: {port: 9001, hostname: 'localhost', livereload: true}}
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('dev', ['copy', 'concat', 'connect', 'watch']);
  grunt.registerTask('build', ['copy', 'uglify', 'cssmin']);

};
