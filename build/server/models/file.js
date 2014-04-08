// Generated by CoffeeScript 1.7.1
var File, americano;

americano = require('americano-cozy');

module.exports = File = americano.getModel('File', {
  path: String,
  name: String,
  docType: String,
  creationDate: String,
  lastModification: String,
  "class": String,
  size: Number,
  binary: Object,
  modificationHistory: Object,
  clearance: function(x) {
    return x;
  },
  tags: function(x) {
    return x;
  }
});

File.all = function(params, callback) {
  return File.request("all", params, callback);
};

File.byFolder = function(params, callback) {
  return File.request("byFolder", params, callback);
};

File.prototype.getFullPath = function() {
  return this.path + '/' + this.name;
};

File.prototype.getPublicURL = function(cb) {
  return CozyInstance.getURL((function(_this) {
    return function(err, domain) {
      var url;
      if (err) {
        return cb(err);
      }
      url = "" + domain + "public/files/files/" + _this.id;
      return cb(null, url);
    };
  })(this));
};

if (process.env.NODE_ENV === 'test') {
  File.prototype.index = function(fields, callback) {
    return callback(null);
  };
  File.prototype.search = function(query, callback) {
    return callback(null, []);
  };
}
