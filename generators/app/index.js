'use strict';

var generator = require('yeoman-generator');
var S = require('string');
module.exports = generator.Base.extend({
    init: function () {
        this.appname = S(this.appname).humanize().slugify().camelize().s;
    },
    info: function () {
        this.log('Out of the box I generate RAML documentation hosted with an Express server.\n');
    },
    prompting: function () {
        var done = this.async();
        this.prompt({
            type: 'input',
            name: 'name',
            message: 'Your project name',
            default: this.appname // Default to current folder name
        }, function (answers) {
            this.appname = answers.name;
            done();
        }.bind(this));
    },
    writing: {
        api: function () {
            this.fs.copyTpl(
                this.templatePath('api/**/*'),
                this.destinationPath('api'),
                {
                    appname: this.appname
                }
            );
        },
        server: function () {
            this.fs.copyTpl(
                this.templatePath('server/**/*'),
                this.destinationPath('server'),
                {
                    appname: this.appname
                }
            )
        },
        raml2html_templates: function () {
            this.fs.copyTpl(
                this.templatePath('raml2html-templates/*'),
                this.destinationPath('raml2html-templates')
            );
        },
        images: function () {
            this.fs.copyTpl(
                this.templatePath('api/documentation/images/*'),
                this.destinationPath('api/documentation/images')
            );
        },
        gruntFile: function () {
            this.fs.copy(
                this.templatePath('Gruntfile.js'),
                this.destinationPath('Gruntfile.js')
            )
        },
        package: function () {
            this.fs.copyTpl(
                this.templatePath('package.json'),
                this.destinationPath('package.json'),
                {
                    appname : this.appname
                }
            )
        },
        bower: function () {
            this.fs.copyTpl(
                this.templatePath('bower.json'),
                this.destinationPath('bower.json'),
                {
                    appname : this.appname
                }
            )
        },
        install: function () {
            this.installDependencies({
                skipMessage: this.options['skip-install-message'],
                skipInstall: this.options['skip-install']
            });
        }
    }
});
