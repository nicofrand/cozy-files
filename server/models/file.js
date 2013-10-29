// Generated by CoffeeScript 1.6.3
var File, americano;

americano = require('americano-cozy');

module.exports = File = americano.getModel('File', {
  path: String,
  name: String,
  permissions: String
});

({
  creationDate: String,
  lastModification: String,
  size: Number,
  binary: Object,
  modificationHistory: Object
});

File.all = function(params, callback) {
  return File.request("all", params, callback);
};

File.byFolder = function(params, callback) {
  return File.request("byFolder", params, callback);
};
