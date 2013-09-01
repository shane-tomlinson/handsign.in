/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
(function() {
  "use strict";


  var resultsEl = document.querySelector('#results');
  var averagesEl = document.querySelector('#averages');

  var written = false;
  var totals = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var averages = [];
  var cycles = 0;
  var stop = false;

  Leap.loop(function(frame) {
    if (stop) return;
    if (!frame.valid) return;
    var pointables = frame.pointables;

    if (pointables) {
      if (pointables.length === 5) {
        cycles++;

        pointables = pointables.sort(function(a, b) {
          return b.length - a.length;
        });

        pointables.forEach(function(pointable, index) {
          totals[index] += pointable.length;
          averages[index] = (totals[index] / cycles).toFixed(2);
        });
        averagesEl.innerHTML = averages.join(" ");

        if (cycles === 500) {
          stop = true;
          document.querySelector("[name=first]").setAttribute("value", averages[0]);
          document.querySelector("[name=second]").setAttribute("value", averages[1]);
          document.querySelector("[name=third]").setAttribute("value", averages[2]);
          document.querySelector("[name=forth]").setAttribute("value", averages[3]);
          document.querySelector("[name=fifth]").setAttribute("value", averages[4]);
          document.querySelector("button").removeAttribute("disabled");
        }
      }
    }
  });

}());

