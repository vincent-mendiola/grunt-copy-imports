/*
 * grunt-copy-imports
 * https://github.com/vincent-mendiola/grunt-copy-imports
 *
 * Copyright (c) 2015 Vincent Mendiola II
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var path = require('path'),
    chalk = require('chalk');

  grunt.registerMultiTask('copy_imports', 'Copy files and make @import directives relative to the destination file.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      basePath: '',
      exclude: false,
      styles: true
    });

    var imports = '',
      styleRules = '',
      matched = '',
      output = '';

    // Iterate over all specified file groups.
    this.files.forEach(function(file) {
      var destDir = path.dirname(file.dest),
        regex = /@import\s(?:[^(url\()].*)?(?:\'|\")(.*)(?:\'|\")(?:[^(\))])?(?:.*)?\;(?:\r?\n|\r)?/gi;

      // Handle file source.
      file.orig.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(options.basePath + filepath)) {
          grunt.log.warn('Source file "' + options.basePath + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath, index) {
        var fileDir = path.dirname(options.basePath + filepath);

        // Read file source.
        var src = grunt.file.read(options.basePath + filepath);

        // Replace file path with relative file path.
        src.replace(regex, function(match, text) {
          var updatedPath = path.relative(destDir, fileDir + '/' + text);

          // Skip duplicate imports.
          if (index > 0 && imports.match(new RegExp(RegExp.escape(updatedPath), 'gi'))) {
            return;
          // Handle all files.
          } else if (!options.exclude) {
            matched = match;
            imports += match.replace(text, path.relative(destDir, fileDir + '/' + text));
          } else {
            // Remove excluded files.
            if (Array.isArray(options.exclude)) {
              if (options.exclude.indexOf(text.split('/').pop()) === -1) {
                matched = match;
                imports += match.replace(text, updatedPath);
              }
            } else if (!options.exclude.hasOwnProperty(filepath) || (options.exclude.hasOwnProperty(filepath) && options.exclude[filepath].indexOf(text.split('/').pop()) === -1)) {
              if (!options.exclude.hasOwnProperty('*') || (options.exclude.hasOwnProperty('*') && options.exclude['*'].indexOf(text.split('/').pop()) === -1)) {
                matched = match;
                imports += match.replace(text, updatedPath);
              }
            }
          }
        });

        // Copy the style rules.
        if (options.styles) {
          styleRules += src.substring(src.indexOf(matched) + matched.length);
        }
      });

      // Concatenate the style rules and the imports.
      output += (styleRules !== '') ? imports + styleRules : imports;

      // Write the destination file.
      grunt.file.write(file.dest, output);

      // Print a success message.
      grunt.log.writeln('File ' + chalk.green(file.dest) + ' created.');
    });
  });
  RegExp.escape = function(string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  };
};
