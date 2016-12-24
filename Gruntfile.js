module.exports = (grunt) => {

  grunt.initConfig({
    watch: {
      files: ['src/**/*.css', 'src/**/*.js', './*.html'],
      options: {
        livereload: true,
      }
    },
    connect: {
      server: {
        options: {
          port: 9001,
          hostname: 'localhost',
          base: '.',
          livereload: true,
          open: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['connect', 'watch']);

};
