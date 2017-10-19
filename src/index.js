'use strict';

var includePaths = require('rollup-plugin-includepaths');
var replace = require('rollup-plugin-replace');
var path = require('path');

var dirPath = path.dirname(require.resolve('.'));
var nodeIndex = dirPath.indexOf('node_modules/');
var nodePath = dirPath.slice(0, nodeIndex);
var basePath = nodePath + 'node_modules/glimmer-redux/src/store.js:./';
var connectPath = nodePath + 'node_modules/glimmer-redux/src/connect.js:./';

var glimmerRedux = basePath + 'reducers/index';
var reducersPath = './src/reducers/index.js';

var index = (function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var includedOverrides = {
    [glimmerRedux]: reducersPath
  }

  if (options.enhancers) {
    var enhancersPath = basePath + 'enhancers/index';
    includedOverrides[enhancersPath] = options.enhancers;
  }

  if (options.middleware) {
    var middlewarePath = basePath + 'middleware/index';
    includedOverrides[middlewarePath] = options.middleware;
  }

  if (options.store) {
    var storePath = connectPath + 'store';
    includedOverrides[storePath] = options.store;
  }

  return {
    resolveId: function resolveId(file, origin) {
      return includePaths({
        include: includedOverrides
      }).resolveId(file, origin);
    },
    transform: function transform(code, id) {
      return replace({
        'process.env.NODE_ENV': JSON.stringify(process.env.EMBER_ENV)
      }).transform(code, id);
    }
  };
});

module.exports = index;
