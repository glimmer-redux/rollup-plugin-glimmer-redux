'use strict';

var path = require('path');
var fs = require('fs-extra');
var Resolver = require('../src/resolver');

var prepareSamples = function() {
  fs.copySync(path.join('samples', 'src'), path.join('samples', 'basic', 'src'));
  fs.copySync(path.join('samples', 'src'), path.join('samples', 'enhancers', 'src'));
  fs.copySync(path.join('samples', 'src'), path.join('samples', 'middleware', 'src'));
  fs.copySync(path.join('samples', 'src'), path.join('samples', 'javascript', 'src'));
  fs.copySync(path.join('samples', 'src'), path.join('samples', 'nested', 'src'));
  fs.copySync(path.join('samples', 'src'), path.join('samples', 'store', 'src'));
  fs.copySync(path.join('samples', 'src'), path.join('samples', 'todos', 'src'));
}

var patchReducer = function(directory) {
  fs.copySync(path.join('samples', directory, 'move'), path.join('src', 'reducers'));
  Resolver.prototype.storePath = function() {
    return this.cwd + '/samples/' + directory + '/src/store.js:./';
  }
}

var patchEnhancer = function(directory) {
  fs.copySync(path.join('samples', directory, 'enhancers'), path.join('src', 'enhancers'));
  Resolver.prototype.storePath = function() {
    return this.cwd + '/samples/' + directory + '/src/store.js:./';
  }
}

var patchMiddleware = function(directory) {
  fs.copySync(path.join('samples', directory, 'middleware'), path.join('src', 'middleware'));
  Resolver.prototype.storePath = function() {
    return this.cwd + '/samples/' + directory + '/src/store.js:./';
  }
}

var patchStore = function(directory) {
  var store = fs.readFileSync(path.join('samples', directory, 'store.ts'), 'utf8');
  fs.writeFileSync(path.join('src', 'store.ts'), store, { encoding: 'utf8' });
  Resolver.prototype.connectPath = function() {
    return this.cwd + '/samples/' + directory + '/src/connect.js:./';
  }
  Resolver.prototype.storePath = function() {
    return this.cwd + '/samples/' + directory + '/src/store.js:./';
  }
}

var helper = {
  patchReducer: patchReducer,
  patchMiddleware: patchMiddleware,
  patchEnhancer: patchEnhancer,
  patchStore: patchStore,
  prepareSamples: prepareSamples
}

module.exports = helper;
