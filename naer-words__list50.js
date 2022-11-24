// ==UserScript==
// @name         樂詞網自動選擇顯示 50 筆
// @namespace    https://github.com/zica87
// @version      0.1
// @description  每頁筆數自動選擇 50
// @author       zica
// @match        https://terms.naer.edu.tw/search/*
// @grant        none
// @license      GPL-2.0
// ==/UserScript==

(function() {
    'use strict';

    const a = document.getElementsByClassName('form-select-sm')[0];
    // No.2 == 50
    a.selectedIndex = 2;
    a.children[2].dispatchEvent(new Event('change', {bubbles: true}));
})();
