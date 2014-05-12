// Generated by CoffeeScript 1.7.1
var RealtimeAdapter, localization;

localization = require('./lib/localization_manager');

RealtimeAdapter = require('cozy-realtime-adapter');

module.exports.beforeStart = function(callback) {
  return localization.initialize(callback);
};

module.exports.afterStart = function(app, server, callback) {
  var realtime;
  realtime = RealtimeAdapter({
    server: server
  }, ['file.*', 'folder.*', 'contact.*']);
  if (callback != null) {
    return callback(app, server);
  }
};
