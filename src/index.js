'use strict';

var Mapper = require('./mapper');
var Resolver = require('./resolver');
var Configuration = require('./configuration');
var typescript = require('typescript');
var replace = require('rollup-plugin-replace');

var FileMapper = new Mapper();

var transpiled = [];
var includedOverrides = {};
function configureTypeScript(file, origin) {
  if (file.indexOf('./') > -1 && transpiled.length > 0) {
    var found = transpiled.filter((function(id) {
      return id === origin;
    }));
    if (found.length > 0) {
      var mapping = FileMapper.getFileMapping(file, found[0]);
      includedOverrides[mapping.tsMapping] = mapping.fileMapping;
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

  var TsConfiguration = new Configuration();
  var tsconfig = TsConfiguration.fetch();

  var PathResolver = new Resolver();
  var storePath = PathResolver.storePath();
  var connectPath = PathResolver.connectPath();

  storePath = toLinuxPath(storePath)
  connectPath = toLinuxPath(connectPath)

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
      origin = toLinuxPath(origin)
      configureTypeScript(file, origin);
      return resolvePath(file, origin);
    },
    transform: function transform(code, id) {
      if (/^\.\/src\/(.*)\/.+\.ts$/.test(id) || /^\.\/src\/store.ts$/.test(id)) {
        transpiled.push(id);
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

function toLinuxPath(path) {
  return path?.replace(/\\/g, '/')
}

module.exports = index;
