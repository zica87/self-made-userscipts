// ==UserScript==
// @name         Clean stackoverflow
// @namespace    https://github.com/zica87/self-made-userscipts
// @version      0.1
// @description  Remove hot questions and "free Team" sections on stackoverflow.
// @author       zica
// @match        https://stackoverflow.com/questions/*
// @grant        none
// @license      GPL-2.0
// ==/UserScript==

(function() {
    'use strict';

    document.getElementById("hot-network-questions").remove();
    document.getElementsByClassName("js-freemium-cta")[0].remove();
})();
