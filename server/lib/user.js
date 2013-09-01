/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const _ = require('underscore');

const MARGIN_OF_ERROR = 0.05;

function inRange(itemToCheck, target) {
  itemToCheck = parseFloat(itemToCheck);
  target = parseFloat(target);

  var min = target - (target * MARGIN_OF_ERROR);
  var max = target + (target * MARGIN_OF_ERROR);

  console.log("min", min, "max", max, "itemToCheck", itemToCheck, "target", target);
  return min <= itemToCheck && itemToCheck <= max;
}

var User = {
  isSame: function(data) {
    for (var key in this) {
      if (this.hasOwnProperty(key) && typeof this[key] !== "function") {
        if (key === "username") {
          if(data.username !== this.username) return false;
        } else if (! inRange(data[key], this[key])) {
          console.log("failure on", key);
          return false;
        }
      }
    }

    return true;
  }
}


exports.create = function(data) {
  var user = Object.create(User);
  user = _.extend(data, user);
  return user;
};

