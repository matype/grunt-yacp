/*
 * grunt-yacp
 *
 * Copyright (c) 2014 Masaaki Morishita
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  var Yacp = require('yacp');

  grunt.registerMultiTask('yacp', 'Compile YACP (Yet Another CSS Preprocessor)', function () {

    var options = this.options ({
      punctuation: '.',
      separator: '\n'
    });

    this.files.forEach(function (file) {
      var src = file.src.filter(function (filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function (filepath) {
        var yacpFile = grunt.file.read(filepath);
        var yacp = new Yacp(yacpFile);
        return yacp.toString();
      }).join(grunt.util.normalizelf(options.separator));

      grunt.file.write(file.dest, src);

      grunt.log.writeln('File "' + file.dest + '" created.');
    });
  });

};
