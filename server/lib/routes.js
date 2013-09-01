/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const path        = require('path');
const fs          = require('fs');

const ROUTES_PATH = path.join(__dirname, 'routes');

exports.addRoutes = function(server, done) {
  fs.readdir(ROUTES_PATH, function(err, files) {
    if (err) return done(err);

    files.forEach(function(file) {
      if (! /\.js$/.test(file)) {
        console.log("ignoring", file);
        return;
      }
      console.log("adding route: " + file);
      var route = require(path.join(ROUTES_PATH, file));
      server.route(route);
    });

    done(null);
  });
};

