// ==UserScript==
// @name         LeetCode solution article widener
// @namespace    https://github.com/zica87/self-made-userscipts
// @version      1.0
// @description  Add a toggle to widen the solution articles to view long code easier.
// @author       zica
// @match        https://leetcode.com/problems/*/solutions/*/*/
// @grant        none
// @license      GPL-2.0
// ==/UserScript==

(function() {
    'use strict';

    const toggle = document.createElement('button');
    toggle.innerText = '←→';
    Object.assign(toggle.style, {
        color: 'white',
        backgroundColor: 'rgb(40 40 40)',
        borderRadius: '0.75rem',
        padding: '1em',
        fontSize: '110%',
        fontWeight: 'bold',
        zIndex: '999',
        position: 'fixed',
        bottom: '5vh',
        right: '2vw',
    });
    toggle.onclick = ()=>{
        if (toggle.innerText === '←→'){
            document.getElementsByClassName('lc-lg:w-[250px]')[0].hidden = true;
            document.getElementsByClassName('max-w-[1020px]')[0].style.maxWidth = 'none';
            document.getElementsByClassName('lc-lg:max-w-[700px]')[0].style.maxWidth = 'none';
            toggle.innerText = 'Default';
        }
        else{
            document.getElementsByClassName('max-w-[1020px]')[0].style = '1020px';
            document.getElementsByClassName('lc-lg:max-w-[700px]')[0].style.maxWidth = '700px';
            document.getElementsByClassName('lc-lg:w-[250px]')[0].hidden = false;
            toggle.innerText = '←→';
        }
    };
    document.body.appendChild(toggle);
})();