/*
 * grunt-yacp
 *
 *
 * Copyright (c) 2014 Masaaki Morishita
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  var Yacp = require('yacp');

  grunt.registerMultiTask('yacp', 'Compile YACP (Yet Another CSS Preprocessor)', function () {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options ({
      punctuation: '.',
      separator: ', '
    });

    // Iterate over all specified file groups.
    this.files.forEach(function (file) {
      // Concat specified files.
      var src = file.src.filter(function (filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function (filepath) {
        // Read file source.
        var yacpFile = grunt.file.read(filepath);
        var yacp = new Yacp(yacpFile);
        return yacp.toString();
      }).join(grunt.util.normalizelf(options.separator));

      // Handle options.
      src += options.punctuation;

      // Write the destination file.
      grunt.file.write(file.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + file.dest + '" created.');
    });
  });

};
