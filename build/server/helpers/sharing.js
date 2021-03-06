// Generated by CoffeeScript 1.9.3
var File, Folder, NotificationHelper, User, _5min, clearance, cozydb, cozydomain, doSendNotif, localization, mailsToSend, notifications, notiftemplate, publicURL, timer;

File = require('../models/file');

Folder = require('../models/folder');

User = require('../models/user');

clearance = require('cozy-clearance');

NotificationHelper = require('cozy-notifications-helper');

localization = require('../lib/localization_manager');

cozydb = require('cozydb');

cozydomain = 'http://your.friends.cozy.url/';

cozydb.api.getCozyDomain(function(err, domain) {
  if (err) {
    return console.log(err);
  }
  return cozydomain = domain;
});

notifications = new NotificationHelper('files');

publicURL = function(doc) {
  if (doc instanceof File) {
    return cozydomain + "public/files/files/" + doc.id;
  } else if (doc instanceof Folder) {
    return cozydomain + "public/files/folders/" + doc.id;
  } else {
    throw new Error('wrong usage');
  }
};

module.exports.limitedTree = function(folder, req, perm, callback) {
  if (typeof perm === "function") {
    callback = perm;
    perm = 'r';
  }
  return folder.getParents(function(err, parents) {
    var scan;
    if (err) {
      return callback([]);
    }
    parents.push(folder);
    scan = function() {
      var tested;
      tested = parents[0];
      if (tested == null) {
        return callback([]);
      }
      return clearance.check(tested, perm, req, function(err, rule) {
        if (err) {
          return callback([]);
        }
        if (!rule) {
          parents.shift();
          return scan();
        } else {
          return callback(parents, rule);
        }
      });
    };
    return scan();
  });
};

module.exports.checkClearance = function(doc, req, perm, callback) {
  var checkAscendantVisible;
  if (typeof perm === "function") {
    callback = perm;
    perm = 'r';
  }
  checkAscendantVisible = function() {
    return module.exports.limitedTree(doc, req, perm, function(results, rule) {
      return callback(results.length !== 0, rule);
    });
  };
  if (doc.constructor === File) {
    return clearance.check(doc, perm, req, function(err, result) {
      if (result) {
        return callback(true);
      } else {
        return checkAscendantVisible();
      }
    });
  } else {
    return checkAscendantVisible();
  }
};

mailsToSend = {};

timer = null;

_5min = 5000;

module.exports.notifyChanges = function(who, file, callback) {
  if (timer) {
    clearTimeout(timer);
  }
  return file.getParents(function(err, parents) {
    var folder, i, j, len, len1, params, ref, ref1, rule, uniq;
    if (err) {
      return callback(err);
    }
    for (i = 0, len = parents.length; i < len; i++) {
      folder = parents[i];
      if (!((ref = folder.clearance) != null ? ref.length : void 0)) {
        continue;
      }
      ref1 = folder.clearance;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        rule = ref1[j];
        if (rule.email !== who && rule.notifications) {
          timer = setTimeout(doSendNotif, _5min);
          uniq = rule.key + folder.name;
          mailsToSend[uniq] = {
            name: folder.name,
            url: publicURL(folder) + '?key=' + rule.key,
            to: rule.email
          };
        }
      }
      if (who !== 'owner' && folder.changeNotification) {
        uniq = 'update' + folder.id;
        params = {
          text: localization.t('notification new file', {
            who: who,
            fileName: file.name,
            folderName: folder.name
          }),
          resource: {
            app: 'files',
            url: "#folder/" + folder.id
          }
        };
        notifications.createOrUpdatePersistent(uniq, params, function(err) {
          if (err) {
            return console.log(err);
          }
        });
      }
    }
    return callback(null);
  });
};

notiftemplate = localization.getEmailTemplate('notifmail.jade');

doSendNotif = function() {
  return User.getDisplayName(function(err, displayName) {
    var item, key, mailOptions;
    for (key in mailsToSend) {
      item = mailsToSend[key];
      mailOptions = {
        to: item.to,
        subject: localization.t('email change subject', {
          displayName: displayName,
          itemName: item.name
        }),
        content: item.url,
        html: notiftemplate({
          name: item.name,
          url: item.url,
          displayName: displayName,
          localization: localization
        })
      };
      cozydb.api.sendMailFromUser(mailOptions, function(err) {
        console.log('sent update mail to ', item.to);
        if (err) {
          return console.log(err);
        }
      });
    }
    return mailsToSend = {};
  });
};
