// ==UserScript==
// @name         自動關閉知乎登入提示框
// @namespace    https://github.com/zica87
// @version      0.2
// @description  自動關閉知乎登入提示框（擋在正中間那個）
// @author       zica
// @match        https://zhuanlan.zhihu.com/p/*
// @match        https://www.zhihu.com/question/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const obs = new MutationObserver((recs, instance)=>{
        const X = document.getElementsByClassName('Modal-closeButton')[0];
        if (X){
            instance.disconnect();
            X.click();
        }
    });
    obs.observe(document.body, {
        childList: true
    });
})();
