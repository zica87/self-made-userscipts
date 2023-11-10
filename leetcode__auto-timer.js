// ==UserScript==
// @name         Auto start LeetCode timer
// @name:zh-tw   自動開始 LeetCode 計時器
// @namespace    https://github.com/zica87/self-made-userscipts
// @version      1.1
// @description  Automatically start LeetCode official timer.
// @description:zh-tw 自動開始 LeetCode 官方計時器。
// @author       zica
// @match        https://leetcode.com/problems/*
// @grant        none
// @license      GPL-2.0
// ==/UserScript==

(function () {
    "use strict";

    if (document.URL.includes("/solutions/")) return;

    const observer = new MutationObserver((_, observerInstance) => {
        const cur = document.getElementsByClassName("p-2");
        for (const i of [0, 1]) {
            if (cur[i]?.classList.contains("flex-none")) {
                cur[i].click();
                observerInstance.disconnect();
            }
        }
    });
    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
})();
