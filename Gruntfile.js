/*
 * grunt-copy-imports
 * https://github.com/vincent-mendiola/grunt-copy-imports
 *
 * Copyright (c) 2015 Vincent Mendiola II
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    copy_imports: {
      default_options: {
        files: {
          'tmp/default_options.scss': ['test/fixtures/_bootstrap.scss']
        }
      },
      simple_options: {
        options: {
          exclude: ['variables','mixins']
        },
        files: {
          'tmp/simple_options.scss': ['test/fixtures/_bootstrap.scss','test/fixtures/_bootstrap_extras.scss']
        }
      },
      advanced_options: {
        options: {
          exclude: {
            '*': ['variables'],
            '_bootstrap_extras.scss': ['buttons']
          },
          basePath: 'test/fixtures/',
          styles: false
        },
        files: {
          'tmp/advanced_options.scss': ['_bootstrap.scss','_bootstrap_extras.scss']
        }
      },
      styleRules: {
        options: {
          exclude: ['variables'],
          basePath: 'test/fixtures/'
        },
        files: {
          'tmp/styleRules.scss': ['_bootstrap.scss','bootstrap/_bootstrap_nested.scss']
        }
      }
    },

    sass: {
      options: {
        noCache: true,
        sourcemap: "none"
      },
      default_options: {
        files: {
          'tmp/default_build.scss': ['tmp/default_options.scss']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'copy_imports', 'sass', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
