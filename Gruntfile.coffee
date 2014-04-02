module.exports = (grunt) ->
  # Project configuration.
  @initConfig
    pkg: @file.readJSON 'package.json'
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

  @loadNpmTasks 'grunt-contrib-coffee'
  @loadNpmTasks 'grunt-contrib-watch';
  @loadNpmTasks 'grunt-contrib-uglify';

  # Default task(s).
  @registerTask 'default', ['coffee', 'uglify']
