var fs = require('fs');
var path = require('path');
var typescript = require('typescript');

var Configuration = function() {

};

Configuration.prototype.fetch = function() {
  var tsconfig = this.findFile();
  return this.adjust(tsconfig);
};

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
