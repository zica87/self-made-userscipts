// ==UserScript==
// @name         zerojudge 隱藏標籤
// @namespace    https://github.com/zica87/self-made-userscipts
// @version      0.1
// @description  不顯示題目標籤，按下「顯示標籤」後再顯示
// @author       zica
// @match        https://zerojudge.tw/*
// @license      GPL-2.0
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const tags = document.getElementsByClassName('tag');
    for(const e of tags){
        e.hidden = true;
        const show = document.createElement('button');
        show.innerText = '顯示標籤';
        show.onclick = function(){
            this.nextSibling.hidden = false;
            this.remove();
        };
        e.before(show);
    }
})();
