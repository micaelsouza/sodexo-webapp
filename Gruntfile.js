module.exports = (grunt) => {

  let concat = {
    css: {
      src: ['src/css/*.css'],
      dest: 'dist/css/<%= pkg.name %>.min.css'
    },
    js: {
      src: ['src/js/*.js'],
      dest: 'dist/js/<%= pkg.name %>.min.js'
    }
  };

  let watch = {
    files: ['src/css/*.css', 'src/js/*.js'],
    tasks: ['concat']
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: concat,
    watch: watch
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch', 'concat']);

};
