module.exports = (grunt) => {

  const srcJSFiles = [
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/angular/angular.min.js',
    'src/js/app.js',
    'src/js/app.cards.controller.js',
    'src/js/app.cardsAPI.service.js',
    'src/js/app.idGenerator.service.js'
  ];

  const srcCSSFiles = [
    'src/css/app.css',
    'src/css/app.cards.css',
    'src/css/app.addCards.css'
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
      css: {files: srcCSSFiles, tasks: ['concat:css'], options: {livereload: true}},
      html: {files: './*html'},
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
