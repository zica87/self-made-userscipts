// ==UserScript==
// @name         樂詞網自動選擇顯示 50 筆
// @namespace    https://github.com/zica87/self-made-userscipts
// @version      0.1.1-1
// @description  每頁筆數自動選擇 50
// @author       zica
// @match        https://terms.naer.edu.tw/search/*
// @grant        none
// @license      GPL-2.0
// ==/UserScript==

(function () {
    "use strict";

    const a = document.getElementsByClassName("form-select-sm")[0];
    // 0 = 10 筆（即預設值）
    // 1 = 20 筆
    // 2 = 50 筆
    // 3 = 100 筆
    const selectIndex = 2;
    a.selectedIndex = selectIndex;
    a.children[selectIndex].dispatchEvent(
        new Event("change", { bubbles: true })
    );
})();
