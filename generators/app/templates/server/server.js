'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PORT = process.env.PORT || 9000;
var express = require('express');

var config = require('./environment');
var path = require('path');
var app = express();

console.log(config.root);

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
	//app.use(require('connect-livereload')());
    app.use(require('connect-livereload')());
    //console.log(express.static(path.join(config.root, '.tmp')));
    app.use('/',express.static(path.join(config.root, '../.tmp')));
    app.use('/images',express.static(path.join(config.root, '../.tmp/images')));
}

if (process.env.NODE_ENV === 'production') {
    console.log(path.join(config.root, 'public'));
    app.use('/', express.static(path.join(config.root, 'public')));
    app.use('/images', express.static(path.join(config.root, 'images')))
}

app.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});
module.exports = app;