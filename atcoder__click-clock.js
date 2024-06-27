// ==UserScript==
// @name         auto click AtCoder clock once on page load
// @namespace    https://github.com/zica87/self-made-userscipts
// @version      1.0
// @description  to hide the clock
// @author       zica
// @match        https://atcoder.jp/contests/*
// @grant        none
// @license      GPL-3.0
// ==/UserScript==

(function () {
    "use strict";

    const timer = document.getElementById("fixed-server-timer");
    timer.click();
})();
