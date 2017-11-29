'use strict';

var Resolver = require('./resolver');
var Configuration = require('./configuration');
var typescript = require('typescript');
var replace = require('rollup-plugin-replace');

var TsConfiguration = new Configuration();

var transpiled = [];
var includedOverrides = {};
var configureTypeScript = function(file, origin) {
  if (file !== 'redux' && transpiled.length > 0) {
    var found = transpiled.filter((function(id) {
      return id === origin;
    }));
    if (found.length > 0) {
      var tsFile = found[0];
      var tsMapping = tsFile + ':' + file;
      var fileName = file.replace('./', '');
      var filePath = tsFile.replace(/(.*)[/](.*)\.ts/, '$1');
      var fileMapping = filePath + '/' + fileName + '.ts';
      includedOverrides[tsMapping] = fileMapping;
    }
  }
}

function getCacheKey(id, origin) {
  var isRelativePath = id.indexOf('.') === 0;
  return isRelativePath ? origin + ':' + id : id;
}

function resolveCachedPath(id, origin) {
  var key = getCacheKey(id, origin);
  if (key in includedOverrides) {
    return includedOverrides[key];
  }
  return false;
}

function resolvePath(id, origin) {
  origin = origin || false;
  return resolveCachedPath(id, origin) || null;
}

var index = (function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var PathResolver = new Resolver();
  var storePath = PathResolver.storePath();
  var connectPath = PathResolver.connectPath();

  var defaultReducer = storePath + 'reducers/index';
  var reducersPath = './src/reducers/index.ts';
  includedOverrides[defaultReducer] = reducersPath;

  if (options.reducers) {
    includedOverrides[defaultReducer] = options.reducers;
  }

  if (options.middleware) {
    var middlewarePath = storePath + 'middleware/index';
    includedOverrides[middlewarePath] = options.middleware;
  }

  if (options.enhancers) {
    var enhancersPath = storePath + 'enhancers/index';
    includedOverrides[enhancersPath] = options.enhancers;
  }

  if (options.store) {
    var storePath = connectPath + 'store';
    includedOverrides[storePath] = options.store;
  }

  return {
    resolveId: function resolveId(file, origin) {
      configureTypeScript(file, origin);
      return resolvePath(file, origin);
    },
    transform: function transform(code, id) {
      if (/^\.\/src\/(reducers|middleware|enhancers)\/.+\.ts$/.test(id) || /^\.\/src\/store.ts$/.test(id)) {
        transpiled.push(id);
        var tsconfig = TsConfiguration.fetch();
        var transformed = typescript.transpileModule(code, tsconfig.config);
        return {
          code: transformed.outputText,
          map: transformed.sourceMapText
        };
      }
      return replace({
        'process.env.NODE_ENV': JSON.stringify(process.env.EMBER_ENV)
      }).transform(code, id);
    }
  };
});

module.exports = index;
