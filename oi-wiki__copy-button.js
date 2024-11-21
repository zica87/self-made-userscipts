// ==UserScript==
// @name         OI Wiki 複製程式碼按鈕
// @namespace    https://github.com/zica87/self-made-userscipts
// @version      1.0
// @description  程式碼右上角新增「複製」按鈕
// @author       zica
// @match        https://oi-wiki.org/*
// @match        http://oi-wiki.com/*
// @match        https://demo.oi-wiki.org/*
// @match        https://oi-wiki.net/*
// @match        https://oi-wiki.wiki/*
// @match        https://oi-wiki.win/*
// @match        https://oi-wiki.xyz/*
// @match        https://oiwiki.moe/*
// @match        https://oiwiki.net/*
// @match        https://oiwiki.org/*
// @match        https://oiwiki.vx.st/*
// @match        https://oiwiki.wiki/*
// @match        https://oiwiki.win/*
// @match        https://oiwiki.com/*
// @match        https://oi.wiki/*
// @grant        none
// @license      GPL-3.0
// ==/UserScript==

(function () {
    "use strict";

    let path = undefined;
    const observer = new MutationObserver(() => {
        if (window.location.pathname === path) {
            return;
        }
        path = window.location.pathname;
        add_buttons();
    });
    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });

    function toCopyMode(button) {
        button.textContent = "copy";
        Object.assign(button.style, {
            opacity: null,
            cursor: "pointer",
            backgroundColor: "gray",
        });
    }
    function toCopiedMode(button) {
        button.textContent = "✅copied";
        Object.assign(button.style, {
            opacity: 0.5,
            cursor: null,
            backgroundColor: null,
        });
    }
    function add_buttons() {
        const code_blocks = document.getElementsByClassName("highlight");
        for (const code_block of code_blocks) {
            const code = code_block.getElementsByTagName("code")[0];
            const button = document.createElement("button");
            button.onclick = async () => {
                if (button.textContent[0] == "✅") {
                    return;
                }
                try {
                    await navigator.clipboard.writeText(code.textContent);
                    toCopiedMode(button);
                    setTimeout(() => {
                        toCopyMode(button);
                    }, 3000);
                } catch (error) {
                    alert(error.message);
                    console.error(error);
                }
            };
            Object.assign(button.style, {
                position: "absolute",
                right: "10px",
                top: "10px",
                borderRadius: "5px",
                padding: "3px",
            });
            toCopyMode(button);
            code.before(button);
        }
    }
})();
