var Mapper = function() {

};

Mapper.prototype.getFileName = function(file) {
  if (file.indexOf('../') === -1) {
    return file.replace('./', '');
  }
  return file;
}

Mapper.prototype.getFileMapping = function(file, tsFile) {
  var tsMapping = tsFile + ':' + file;
  var fileName = this.getFileName(file);
  var filePath = tsFile.replace(/(.*)[/](.*)\.ts/, '$1');
  var fileMapping = filePath + '/' + fileName + '.ts';
  return {
    tsMapping: tsMapping,
    fileMapping: fileMapping
  }
};

module.exports = Mapper;
