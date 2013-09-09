/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const keys      = require('browserid-keys');
const templates = require('../templates');

exports.method = 'GET';
exports.path   = '/.well-known/browserid';

exports.handler = function (request) {
  keys.get(function(err, publicKey, privateKey) {
    request.reply(templates.render('well_known.json', {
      publicKey: publicKey
    })).type('application/json');
  });
}

