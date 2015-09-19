
var helpers = require('yeoman-generator').test;
var path = require('path');
var assert = require('yeoman-generator').assert;
describe('ramlsite', function () {
    describe('It should setup the basic structure', function () {
        before(function (done) {
            helpers.run(path.join( __dirname, '../generators/app'))
                .withOptions({ name: 'bar' })    // Mock options passed in
                .withArguments(['name-x'])      // Mock the arguments
                .withPrompts({ coffee: false }) // Mock the prompt answers
                .on('ready', function (generator) {
                    // This is called right before `generator.run()` is called
                })
                .on('end', done);
        });

        it('generate a Gruntfile.js in /', function () {
            assert.file(['Gruntfile.js']);
        });

        it('generate a README.md in api/documentation/images', function () {
            assert.file(['api/documentation/images/README.md']);
        });


        it('generate an api.raml file in folder api/raml', function () {
           assert.file(['api/raml/api.raml']);
        });

        it('generate the raml2html nunjucks files in folder raml2html-templates', function () {
            assert.file([
                'raml2html-templates/item.nunjucks',
                'raml2html-templates/resource.nunjucks',
                'raml2html-templates/template.nunjucks'
            ]);
        });

        it('generate an api.raml file in folder api/raml', function () {
            assert.file(['api/raml/api.raml']);
        });

        it('generate a server files in /server', function(){
            assert.file([
                'server/server.js',
                'server/package.json',
                'server/environment/development.js',
                'server/environment/production.js'
            ]);
        });
    });

    describe('It should replace the name of the project', function () {
        before(function (done) {
            helpers.run(path.join(__dirname, '../generators/app'))
                .withPrompts({name: 'bar'}) // Mock the prompt answers
                .on('ready', function (generator) {
                    // This is called right before `generator.run()` is called
                })
                .on('end', done);
        });

        it('replace the name in the api.raml file', function () {
            assert.fileContent('api/raml/api.raml', /title: bar/);
        });
        it('replace the name in the package.json in the server folder', function () {
            assert.fileContent('server/package.json', /"name": "bar"/);
        });
    });
});