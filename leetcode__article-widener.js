// ==UserScript==
// @name         LeetCode solution article widener
// @namespace    https://github.com/zica87/self-made-userscipts
// @version      2.0
// @description  Add a toggle to widen the solution articles to view long code easier.
// @author       zica
// @match        https://leetcode.com/*
// @grant        none
// @license      GPL-3.0
// ==/UserScript==

(function () {
    "use strict";

    const solutionPageRegEx = new RegExp(
        "https://leetcode.com/problems/.*/solutions/.*/"
    );
    const editorialPageRegEx = new RegExp(
        "https://leetcode.com/problems/.*/editorial"
    );

    const toggle = document.createElement("button");
    toggle.innerText = "←→";
    toggle.onclick = () => {
        if (toggle.innerText === "←→") {
            const articles = document.getElementsByClassName("mx-auto");
            for (const article of articles) {
                article.style.maxWidth = "none";
            }
            toggle.innerText = "default width";
        } else {
            const articles = document.getElementsByClassName("mx-auto");
            for (const article of articles) {
                article.style = {};
            }
            toggle.innerText = "←→";
        }
    };

    const observer = new MutationObserver((_, observerInstance) => {
        if (
            !solutionPageRegEx.test(window.location.href) &&
            !editorialPageRegEx.test(window.location.href)
        ) {
            return;
        }
        const topRightToolbar = document.getElementsByClassName("ml-4")[0];
        if (topRightToolbar === undefined) {
            return;
        }
        observerInstance.disconnect();
        topRightToolbar.prepend(toggle);
    });
    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
})();
