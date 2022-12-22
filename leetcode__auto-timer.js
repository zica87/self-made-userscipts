// ==UserScript==
// @name         Auto start LeetCode timer
// @name:zh-tw   自動開始 LeetCode 計時器
// @namespace    https://github.com/zica87/self-made-userscipts
// @version      1.0
// @description  Automatically start LeetCode official timer.
// @description:zh-tw 自動開始 LeetCode 官方計時器。
// @author       zica
// @match        https://leetcode.com/problems/*
// @grant        none
// @license      GPL-2.0
// ==/UserScript==

(function() {
    'use strict';

    if (document.URL.includes("/solutions/")) return;

    const observer = new MutationObserver((records, observerInstance)=>{
        const timer = document.getElementsByClassName('hover:text-gray-7')[0];
        if (!timer) return;
        timer.click();
        observerInstance.disconnect();
    });
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
