'use strict';

var includePaths = require('rollup-plugin-includepaths');
var replace = require('rollup-plugin-replace');

var index = (function () {
  return {
    resolveId: function resolveId(file, origin) {
      return includePaths({
        include: {
          '@glimmer/component': 'node_modules/@glimmer/component/dist/modules/es2017/index.js',
          'glimmer-redux/src/connect.js:./reducers/index': './src/reducers/index.js'
        }
      }).resolveId(file, origin);
    },
    transform: function transform(code, id) {
      return replace({
        "process.env.NODE_ENV": JSON.stringify(process.env.EMBER_ENV)
      }).transform(code, id);
    }
  };
});

module.exports = index;
