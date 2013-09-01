/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const fs        = require('fs');
const path      = require('path');

const DB_PATH = path.join(__dirname, '..', 'var', 'database.json');

var db;
function getDatabase(done) {
  if (db) return done(null, db);

  try {
    db = JSON.parse(fs.readFileSync(DB_PATH));
  } catch(e) {
    db = {};
  }

  return done(null, db);
};

function saveDatabase(done) {
  if (!db) return (new Error("database not initialized"));

  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
  done(null);
};

exports.isNameAvailable = function(username, done) {
  getDatabase(function(err, db) {
    if (err) return done(err);

    var record = db[username];
    done(null, !record);
  });
};

exports.register = function(user, done) {
  getDatabase(function(err, db) {
    if (err) return done(err);
    if (db[user.username]) return done(new Error("username not available"));

    db[user.username] = user;
    saveDatabase(done);
  });
};

exports.getUser = function(username, done) {
  getDatabase(function(err, db) {
    if (err) return done(err);
    var record = db[username];
    if (! record) return done(new Error("invalid user"));

    done(null, record);
  });
};


