/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const templates = require('../templates');

exports.method = 'GET';
exports.path   = '/provision';

exports.handler = function (request) {
  request.reply(templates.render('provision.html'));
};

