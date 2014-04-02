module.exports = (grunt) ->
  # Project configuration.
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    coffee:
      compile:
        files:
          'dist/simpsum.js': 'coffee/simpsum.coffee'
    uglify:
      target:
        files:
          'dist/simpsum.min.js': 'dist/simpsum.js'
    watch:
      coffee:
        files: ['coffee/*.coffee']
        tasks: ['coffee']
      js:
        files: ['dist/*.js']
        tasks: ['uglify']

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch';
  grunt.loadNpmTasks 'grunt-contrib-uglify';

  # Default task(s).
  grunt.registerTask 'default', ['coffee', 'uglify']
