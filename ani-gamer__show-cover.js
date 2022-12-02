// ==UserScript==
// @name         顯示動畫瘋封面 & 視覺圖
// @namespace    https://github.com/zica87/self-made-userscipts
// @version      1.0.1
// @description  在動畫瘋網站顯示該集封面 & 視覺圖
// @author       zica
// @match        https://ani.gamer.com.tw/animeVideo.php?sn=*
// @grant        none
// @license      GPL-2.0
// ==/UserScript==

(function () {
    'use strict';

    // 顯示視覺圖
    const visual = document.createElement('img');
    visual.src = document.getElementsByName('thumbnail')[0].content;
    Object.assign(visual.style, {
        maxHeight: '40rem',
        float: 'right',
        margin: '10px 10px auto 10px'
    });
    document.getElementsByClassName('anime-title')[0].prepend(visual);
    document.getElementsByClassName('anime-ad')[0].style.position = 'static';

    // 顯示封面
    const cover = document.createElement('img');
    Object.assign(cover.style, {
        width: '100%',
        maxWidth: 'initial',
        height: '100%',
        objectFit: 'contain',
    });

    const observer = new MutationObserver((records, observerInstance) => {
        const ncc = document.getElementsByClassName('video-cover-ncc')[0];
        if (!ncc) return;

        observerInstance.disconnect();
        const dummyVideo = document.getElementById('ani_video_html5_api');
        if (dummyVideo) {
            cover.src = dummyVideo.poster;
            const agreeButton = document.getElementById('adult');
            cover.onclick = () => {
                cover.remove();
                agreeButton.click();
            };
        }
        else {
            // 需要年齡驗證
            cover.src = get_cover_url();
            cover.onclick = () => {
                cover.remove();
                ncc.hidden = false;
            };
        }
        ncc.before(cover);
        ncc.hidden = true;
    });
    observer.observe(document.getElementById('video-container'), {
        childList: true,
        subtree: true
    });

    function get_cover_url() {
        const allScript = document.getElementsByTagName('script');
        const someScript = allScript[allScript.length - 1].textContent;
        // example:
        // <script>
        // animefun.videoSn = 31725;
        // animefun.poster = 'https://p2.bahamut.com.tw/B/2KU/40/1b6bfb1aa1636596a99ef069081j21w5.JPG';
        const ed = someScript.search('\';');
        // [18] == '=' (in front of 31725)
        const st = someScript.slice(18, ed).search('\'');
        const cover_url = someScript.slice(st + 18 + 1, ed);
        return cover_url;
    }
})();
