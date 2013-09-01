/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
define(["lib/eventemitter2","lib/tinyscore"], function(EventEmitter) {
  "use strict";

  /**
   * A basic Hand model. Keeps track of the total length of
   * each of the 5 fingers so that average length can be calculated.
   */
  var FINGERS = 5;

  // The shifting is to minimize additive errors introduced by
  // floating point numbers.
  var SHIFT_BITS = 10;

  function initTotals() {
    var self = this;
    self.totals = [];
    for (var i = 0; i < FINGERS; ++i) {
      self.totals[i] = 0;
    }
  }

  function sortPointables(pointables) {
    return pointables.sort(function(a, b) {
      return b.length - a.length;
    });
  }

  function updateTotals(pointables) {
    var totals = this.totals;
    _.each(pointables, function(pointable, index) {
      totals[index] += Math.round((pointable.length << SHIFT_BITS));
    });
  }


  function Hand() {
    initTotals.call(this);
    this.cycles = 0;
  }
  Hand.prototype = _.extend({
    update: function(pointables) {
      var self = this;
      self.cycles++;

      var sortedPointables = sortPointables(pointables);
      updateTotals.call(self, sortedPointables);

      self.emit('update',
          self.getAverages(), self.getTotals(), sortedPointables);
    },

    getCycles: function() {
      return this.cycles;
    },

    getTotals: function() {
      return this.totals;
    },

    getAverages: function() {
      var self = this;
      if (! this.cycles) throw new Error("No finger info available");

      var averages = []
      self.totals.forEach(function(total, index) {
        averages[index] = ((total >>> SHIFT_BITS) / self.cycles);
      });

      return averages;
    }
  }, EventEmitter.prototype);

  Hand.FINGERS = FINGERS;

  return Hand;
});

