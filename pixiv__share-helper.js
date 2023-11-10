// ==UserScript==
// @name         pixiv share helper
// @name:zh-TW   pixiv 分享助手
// @namespace    https://github.com/zica87/self-made-userscipts
// @version      1.1
// @description  Convert sharing link to text with format: title | creator  link
// @description:zh-TW  將分享連結轉換為文字，格式：標題 | 作者  連結
// @author       zica
// @match        https://www.pixiv.net/artworks/*
// @match        https://www.pixiv.net/en/artworks/*
// @match        https://www.pixiv.net/novel/*
// @grant        none
// @license      GPL-3.0
// ==/UserScript==

(function () {
    "use strict";

    const container = generate_container();
    const [result, set_result] = generate_result();
    const box = generate_box();

    box.oninput = (e) => {
        navigator.clipboard
            .writeText(process(e.target.value))
            .then(
                () => {
                    set_result("text copied", "lightgreen");
                },
                () => {
                    set_result("no clipboard permission", "pink");
                }
            )
            .finally(() => {
                box.value = "";
            });
    };

    container.append(result);
    container.append(box);
    document.body.prepend(container);

    function process(originalUrl) {
        const decoded = decodeURIComponent(originalUrl);
        // https://pawoo.net/share?text=お姉さん | 朱雷@Fantia更新中 #pixiv https://www.pixiv.net/artworks/108688782
        return decoded.substring(decoded.search("=") + 1).replace("#pixiv", "");
        // お姉さん | 朱雷@Fantia更新中  https://www.pixiv.net/artworks/108688782
    }

    function generate_container() {
        const container = document.createElement("div");
        Object.assign(container.style, {
            position: "fixed",
            bottom: "5px",
            right: "5px",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
        });
        return container;
    }

    function generate_result() {
        const result_wrapper = document.createElement("div");
        Object.assign(result_wrapper.style, {
            marginBottom: "60px",
            display: "flex",
            justifyContent: "end",
        });

        const result = document.createElement("p");
        Object.assign(result.style, {
            color: "black",
            padding: "1em",
            textAlign: "end",
            width: "max-content",
        });

        let timeout_id;
        function set_result(text, backgroundColor) {
            Object.assign(result.style, {
                backgroundColor,
            });
            result.textContent = text;
            clearTimeout(timeout_id);
            result.style.display = "block";
            timeout_id = setTimeout(() => {
                result.style.display = "none";
            }, 5000);
        }
        result_wrapper.append(result);
        return [result_wrapper, set_result];
    }

    function generate_box() {
        const box = document.createElement("input");
        box.type = "text";
        Object.assign(box.style, {
            opacity: 0,
            width: "5em",
        });
        function hide() {
            box.style.opacity = 0;
        }
        function show() {
            box.style.opacity = 1;
        }
        box.addEventListener("mouseover", show);
        box.addEventListener("dragover", show);
        box.addEventListener("mouseleave", hide);
        box.addEventListener("dragleave", hide);
        return box;
    }
})();
