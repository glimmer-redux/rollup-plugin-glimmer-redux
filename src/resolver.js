var Resolver = function() {
  this.cwd = process.cwd();
};

Resolver.prototype.storePath = function() {
  return this.cwd + '/node_modules/glimmer-redux/src/store.js:./';
};

Resolver.prototype.connectPath = function() {
  return this.cwd + '/node_modules/glimmer-redux/src/connect.js:./';
};

module.exports = Resolver;
