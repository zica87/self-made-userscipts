// ==UserScript==
// @name         CPE 測資網頁新增「複製」按鈕
// @namespace    https://github.com/zica87/self-made-userscipts
// @version      1.0
// @description  可複製「輸入」或「輸出」
// @author       zica
// @match        https://cpe.cse.nsysu.edu.tw/cpe/file/attendance/problemPdf/testData/*
// @grant        none
// @license      GPL-3.0
// ==/UserScript==

(function () {
    "use strict";

    const tables = document.getElementsByTagName("table");
    Array.from(tables).forEach((table, i) => {
        const copy_button = document.createElement("button");
        Object.assign(copy_button, {
            type: "button",
            textContent: "copy " + (i == 0 ? "input" : "output"),
            onclick: () => {
                navigator.clipboard
                    .writeText(table.getElementsByTagName("pre")[0].textContent)
                    .then(
                        () => {
                            prompt(copy_button, "copied!", "lightgreen");
                        },
                        () => {
                            prompt(
                                copy_button,
                                "copy permission not granted",
                                "pink"
                            );
                        }
                    );
            },
        });
        const button_wrapper = document.createElement("div");
        button_wrapper.append(copy_button);
        tables[0].before(button_wrapper);
    });
    function prompt(button, text, backgroundColor) {
        const content = document.createElement("span");
        Object.assign(content, {
            textContent: text,
        });
        Object.assign(content.style, {
            marginLeft: "1em",
            backgroundColor,
        });
        button.after(content);
        setTimeout(() => {
            content.remove();
        }, 2000);
    }
})();
