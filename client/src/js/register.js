/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
require(["biometric_info"], function(BiometricInfo) {
  "use strict";

  var averagesEl = document.querySelector('#averages');
  var biometricInfo = new BiometricInfo();

  biometricInfo.on('update', function(averages) {
    averagesEl.innerHTML = averages.join(" ");
  });

  biometricInfo.on('done', function(averages) {
    averagesEl.innerHTML = averages.join(" ");
    document.querySelector("[name=first]").setAttribute("value", averages[0]);
    document.querySelector("[name=second]").setAttribute("value", averages[1]);
    document.querySelector("[name=third]").setAttribute("value", averages[2]);
    document.querySelector("[name=forth]").setAttribute("value", averages[3]);
    document.querySelector("[name=fifth]").setAttribute("value", averages[4]);
    document.querySelector("button").removeAttribute("disabled");
  });

  biometricInfo.start();
});
