'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    var path = require('path');

    grunt.initConfig({
        express: {
            options: {
                port: process.env.PORT || 9000
            },
            dev: {
                options: {
                    script: 'server/server.js',
                    debug: true
                }
            },
            prod: {
                options: {
                    script: 'dist/server/server.js'
                }
            }
        },
        open: {
            server: {
                url: 'http://localhost:' + (process.env.PORT || 9000)
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp',
                    dest: 'dist/public',
                    src: ['*']
                },
                    {
                        expand: true,
                        cwd: 'server',
                        dest: 'dist',
                        src: ['**/*']
                    },
                    {
                        expand: true,
                        cwd: 'images',
                        dest: 'dist',
                        src: ['**']
                    }]
            }
        },
        watch: {
            options: {
                livereload: true
            },
            express: {
                files: ['.tmp/**'],
                tasks: ['express:dev'],
                options: {
                    spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
                }
            },
            raml: {
                files: ['api/**/*'],
                tasks: ['raml2html']
            }
        },
        raml2html: {
            all: {
                files: {
                    '.tmp/index.html': ['api/raml/api.raml']
                }
            }
        }
    });

    grunt.registerTask('express-keepalive', 'Keep grunt running', function () {
        this.async();
    });

    grunt.registerTask('build', [
        'raml2html',
        'flatten-raml',
        'copy:dist'
    ]);

    // Used for delaying livereload until after server has restarted
    grunt.registerTask('wait', function () {
        grunt.log.ok('Waiting for server reload...');

        var done = this.async();

        setTimeout(function () {
            grunt.log.writeln('Done waiting!');
            done();
        }, 1500);
    });

    grunt.registerTask('flatten-raml', function () {
        var done = this.async();
        var flat = require('flat-raml');
        var inFile = path.join(__dirname, 'api/raml/api.raml');
        var outFile = path.join(__dirname, '.tmp/api.raml');

        console.log(outFile);
        flat.flatten(inFile, outFile).then(function () {
            done();
        });
    });


    grunt.registerTask('serve', function (target) {

        if (target === 'dist') {
            return grunt.task.run(['build', 'express:prod', 'open', 'express-keepalive']);
        }

        grunt.task.run(
            [
                'raml2html',
                'flatten-raml',
                'express:dev',
                'wait',
                'open',
                'watch:raml'
            ]);
    });
};
