[![Build Status](https://travis-ci.org/rovens/generator-ramlsite.svg)](https://travis-ci.org/rovens/generator-ramlsite)

# RAML Site Generator

> Create a NodeJS express hosted RAML site.

## Usage


Install `yo`, `grunt-cli`, `bower`, `raml2html` and `generator-ramlsite`:
```
npm install -g grunt-cli bower yo raml2html generator-ramlsite
```

Make a new directory, and `cd` into it:
```
mkdir my-new-project && cd $_
```

Run `yo ramlsite`, optionally passing an app name:
```
yo ramlsite [app-name]
```

Run `grunt build` for building and `grunt serve` for preview

When running in production ensure that NODE_ENV is set to 'production'

