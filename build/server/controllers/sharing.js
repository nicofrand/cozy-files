// Generated by CoffeeScript 1.7.1
var File, Folder, async, clearance, clearanceCtl, fs, helpers, jade, mailTemplate, templatefile;

File = require('../models/file');

Folder = require('../models/folder');

helpers = require('../helpers/sharing');

clearance = require('cozy-clearance');

async = require('async');

jade = require('jade');

fs = require('fs');

templatefile = require('path').join(__dirname, '../views/sharemail.jade');

mailTemplate = jade.compile(fs.readFileSync(templatefile, 'utf8'));

clearanceCtl = clearance.controller({
  mailTemplate: function(options) {
    options.type = options.doc.docType.toLowerCase();
    return mailTemplate(options);
  },
  mailSubject: function(options) {
    var type;
    type = options.doc.docType.toLowerCase();
    return "Cozy-file: someone has shared a " + type + " with you";
  }
});

module.exports.fetch = function(req, res, next, id) {
  var err;
  switch (req.params.type) {
    case 'file':
      return File.find(id, function(err, file) {
        req.doc = file;
        return next();
      });
    case 'folder':
      return Folder.find(id, function(err, folder) {
        req.doc = folder;
        return next();
      });
    default:
      err = new Error('bad usage');
      err.status = 400;
      return next(err);
  }
};

module.exports.details = function(req, res, next) {
  return Folder.all((function(_this) {
    return function(err, folders) {
      var fullPath, inherited, isPublic, parents, results;
      if (err) {
        return callback(err);
      }
      fullPath = req.doc.getFullPath();
      parents = folders.filter(function(tested) {
        return fullPath.indexOf(tested.getFullPath()) === 0 && fullPath !== tested.getFullPath();
      });
      parents.sort(function(a, b) {
        return a.getFullPath().length - b.getFullPath().length;
      });
      results = parents.map(function(parent) {
        return {
          name: parent.path + '/' + parent.name,
          clearance: parent.clearance || []
        };
      });
      isPublic = false;
      inherited = results != null ? results.filter(function(x) {
        if (x.clearance === 'public') {
          isPublic = true;
        }
        return isPublic || x.clearance.length !== 0;
      }) : void 0;
      return res.send({
        inherited: inherited
      });
    };
  })(this));
};

module.exports.change = clearanceCtl.change;

module.exports.sendAll = clearanceCtl.sendAll;

module.exports.contactList = clearanceCtl.contactList;
