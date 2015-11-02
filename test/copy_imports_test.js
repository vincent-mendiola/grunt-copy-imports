'use strict';

var grunt = require('grunt');
var chalk = require('chalk');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.copy_imports = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/default_options.scss');
    var expected = grunt.file.read('test/expected/default_options.scss');
    test.equal(actual, expected, chalk.magenta('Expects all of the default imports to be present and updated in the ' + chalk.blue('default_options.scss') + '.'));

    test.done();
  },
  simple_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/simple_options.scss');
    var expected = grunt.file.read('test/expected/simple_options.scss');
    test.equal(actual, expected, chalk.magenta('Expects the ' + chalk.red('_variables.scss') + ' and ' + chalk.red('_mixins.scss') + ' imports to be excluded from the ' + chalk.blue('simple_options.scss.') + '.'));

    test.done();
  },
  advanced_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/advanced_options.scss');
    var expected = grunt.file.read('test/expected/advanced_options.scss');
    test.equal(actual, expected, chalk.magenta('Expects the ' + chalk.red('_variables.scss') + ' import to be excluded from the ' + chalk.blue('advanced_options.scss') + '.'));

    test.done();
  },
  default_build: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/default_build.scss');
    var expected = grunt.file.read('test/expected/default_build.scss');
    test.equal(actual, expected, chalk.magenta('Expects the ' + chalk.blue('default_build.scss') + ' to compile using all of the default imports.'));

    test.done();
  },
};
