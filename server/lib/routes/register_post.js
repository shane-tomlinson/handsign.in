/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const hapi      = require('hapi');
const db        = require('../db');

exports.method = 'POST';
exports.path   = '/register';

exports.handler = function (request) {
  db.register(request.payload, function(err) {
    if (err) {
      var error = hapi.error.badRequest(String(err));
      error.response.code = 499;    // Assign a custom error code
      error.reformat();
      request.reply(error);
    }

    request.reply({ success: true, data: request.payload });
  });
};


