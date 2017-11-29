var fs = require('fs');
var path = require('path');
var typescript = require('typescript');

var Configuration = function() {
  this.options = undefined;
};

Configuration.prototype.fetch = function() {
  if (this.options) {
    return this.options;
  }
  var tsconfig = this.findFile();
  var configuration = this.adjust(tsconfig);
  this.options = configuration;
  return configuration;
}

Configuration.prototype.findFile = function() {
  var cwd = process.cwd();
  return typescript.readConfigFile(path.join(cwd, 'tsconfig.json'), function(filePath) {
    return fs.readFileSync(filePath, 'utf8');
  });
};

Configuration.prototype.adjust = function(tsconfig) {
  tsconfig.config.compilerOptions.sourceMap = true;
  delete tsconfig.config.compilerOptions.inlineSourceMap;
  delete tsconfig.config.compilerOptions.inlineSources;
  return tsconfig;
};

module.exports = Configuration;
