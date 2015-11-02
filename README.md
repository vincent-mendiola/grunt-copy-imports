# grunt-copy-imports

> Copy files and make @import directives relative to the destination file.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-copy-imports --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-copy-imports');
```

## The "copy_imports" task

### Overview
In your project's Gruntfile, add a section named `copy_imports` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  copy_imports: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.basePath
Type: `String`
Default value: `''`

The base path that should be used for all paths defined within `files`.

#### options.exclude
Type: `Array|Object`
Default value: `false`

An array of filenames that should be excluded when copying the `@import` directives. An object can also be used to exclude imports from specific files. The filename should be used as the property name when defining the list of imports to exclude by file. The `'*'` glob can be used to exclude an import from all files. Any duplicate imports will be automatically ignored when the imports are combined.

#### options.styles
Type: `Boolean`
Default value: `true`

Include all style rules that come after the `@import` directives. The `@imports` will be placed above the style rules in the output file, and appear in the order determined by the `files` object.

### Usage Examples

#### Default Options
The destination file will include all of the `@import` directives and style rules by default.

```js
grunt.initConfig({
  copy_imports: {
    options: {},
    files: {
      'dest/default_options.scss': ['src/_imports.scss']
    },
  },
});
```

#### Simple Options
The destination file will exclude any imports with the filename "variables.scss" that are found within any of the files.

```js
grunt.initConfig({
  copy_imports: {
    options: {
      exclude: ['variables.scss']
    },
    files: {
      'dest/simple_exclude.scss': ['src/_imports.scss','src/_imports-2.scss'],
    },
  },
});
```

#### Advanced Options
The destination file will exclude any imports with the filename "variables.scss" that are found within any of the files. Any style rules within the files and the import directive for "file-to-exclude.scss" found in "_imports-2.scss" will also be excluded.

```js
grunt.initConfig({
  copy_imports: {
    options: {
      exclude: {
        '*': ['variables.scss'],
        '_imports-2.scss': ['file-to-exclude.scss']
      },
      basePath: 'src/',
      styles: false
    },
    files: {
      'dest/simple_exclude.scss': ['_imports.scss','_imports-2.scss'],
    },
  },
});
```

## Contributing
Feel free to contribute with issues or code.

## Release History
* 2015-11-02    v0.1.0 - Initial release
