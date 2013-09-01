/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const hapi      = require('hapi');
const path      = require('path');
const routes     = require('./lib/routes');

// Create a server with a host and port
var server = hapi.createServer('localhost', 8000);

routes.addRoutes(server, function(err) {
  if (err) return done(err);

  // Start the server
  server.start();
});

