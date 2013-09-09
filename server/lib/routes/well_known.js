/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const keys      = require('browserid-keys');
const templates = require('../templates');

exports.method = 'GET';
exports.path   = '/.well-known/browserid';

var supportDoc;

exports.handler = function (request) {
  if (supportDoc) return sendSupportDoc(request);

  keys.get(function(err, publicKey, privateKey) {
    // XXX check for error.
    //
    supportDoc = JSON.stringify({
      "public-key": JSON.parse(publicKey),
      "authentication": "/sign_in",
      "provisioning": "/provisioning"
    }, null, 2);
    sendSupportDoc(request);
  });
};

function sendSupportDoc(request) {
  request.reply(supportDoc).type('application/json');
};

