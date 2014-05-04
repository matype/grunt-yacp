/*
 * grunt-yacp
 *
 * Copyright (c) 2014 Masaaki Morishita
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    clean: {
      tests: ['tmp']
    },

    yacp: {
      compile: {
        files: {
          'tmp/yacp.css': ['test/fixtures/yacp.css'],
          'tmp/concat.css': ['test/fixtures/yacp.css', 'test/fixtures/yacp2.css'],
        }
      }
    },

  });

  grunt.loadTasks('tasks');
  grunt.registerTask('test', ['clean', 'yacp']);
  grunt.registerTask('default', ['jshint', 'test']);

};
