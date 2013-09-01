/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
define(["lib/eventemitter2", "hand", "lib/tinyscore", "lib/leap"],
    function(EventEmitter, Hand) {
  "use strict";

  var MAX_CYCLES = 500;

  function createController() {
    this.controller = new Leap.Controller();
  }

  function createHand() {
    this.hand = new Hand();
  }

  function onFrame(hand, frame) {
    if (!frame.valid) return;

    var pointables = frame.pointables;
    if (pointables && pointables.length === Hand.FINGERS) {
      hand.update(pointables);
    }
  }

  function onHandUpdate(averages, totals, pointables) {
    var self = this;
    self.emit('update', averages, totals, pointables);

    if (self.hand.getCycles() === MAX_CYCLES) {
      self.controller.removeListener('frame', self.boundOnFrame);
      self.hand.removeListener('update', self.boundOnHandUpdate);

      self.emit('done', averages, totals);
    }
  }

  function BiometricInfo() {
    var self = this;
    createController.call(self);
    createHand.call(self);
  }
  BiometricInfo.prototype = _.extend({
    start: function() {
      var self = this;
      self.controller.connect();

      self.boundOnFrame = onFrame.bind(self, self.hand);
      self.controller.on('frame', self.boundOnFrame);

      self.boundOnHandUpdate = onHandUpdate.bind(self);
      self.hand.on('update', self.boundOnHandUpdate);
    }
  }, EventEmitter.prototype);

  return BiometricInfo;
});
