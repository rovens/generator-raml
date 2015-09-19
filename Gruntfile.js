'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    var path = require('path');

    grunt.initConfig({
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    quiet: false, // Optionally suppress output to standard out (defaults to false)
                    clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
                },
                src: ['test/**/*.js']
            }
        },
        watch: {
            all: {
                files: [
                    '**/*'
                ],
                tasks: [
                    'mochaTest'
                ]
            }
        }
    });


    grunt.registerTask('default', 'watch');
};
