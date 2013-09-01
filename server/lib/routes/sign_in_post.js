/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const hapi      = require('hapi');
const db        = require('../db');
const User      = require('../user');

exports.method = 'POST';
exports.path   = '/sign_in';

exports.handler = function (request) {
  db.getUser(request.payload.username, function(err, userData) {
    if (err) {
      var error = hapi.error.badRequest(String(err));
      request.reply(error);
    }

    var user = User.create(userData);
    if (user.isSame(request.payload)) {
      request.reply({ success: true, data: userData });
    }
    else {
      console.log("expected", JSON.stringify(userData, null, 2), "got", request.payload);

      var error = hapi.error.unauthorized("Sign in failed");
      request.reply(error);
    }

  });
};



