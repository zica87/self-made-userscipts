// ==UserScript==
// @name         pixiv share helper
// @name:zh-TW   pixiv 分享助手
// @namespace    https://github.com/zica87/self-made-userscipts
// @version      2.0
// @description  Convert sharing link to text with format: title | creator  link
// @description:zh-TW  將分享連結轉換為文字，格式：標題 | 作者  連結
// @author       zica
// @match        https://www.pixiv.net/artworks/*
// @match        https://www.pixiv.net/en/artworks/*
// @match        https://www.pixiv.net/novel/*
// @match        https://www.pixiv.net/users/*
// @match        https://www.pixiv.net/en/users/*
// @grant        none
// @license      GPL-3.0
// ==/UserScript==

(function () {
    "use strict";

    const container = generate_container();
    const [result, set_result] = generate_result();
    const box = generate_box();

    function copyText(text) {
        navigator.clipboard.writeText(text).then(
            () => {
                set_result("text copied", "lightgreen");
            },
            () => {
                set_result("no clipboard permission", "pink");
            }
        );
    }
    box.oninput = (e) => {
        copyText(process(e.target.value));
        box.value = "";
    };

    container.append(result);
    container.append(box);
    document.body.prepend(container);
    let copyButton;
    let textToShare;

    const observer = new MutationObserver((_, observerInstance) => {
        const shareOptions = document.getElementsByClassName("sc-1o8nozx-2");
        const shareToPawoo = shareOptions[shareOptions.length - 1];
        const rawURL = shareToPawoo?.firstElementChild?.href;
        if (!rawURL?.startsWith("https://pawoo.net/share?text=")) {
            return;
        }
        if (copyButton === undefined) {
            copyButton = document.createElement("li");
            copyButton.classList = shareToPawoo.classList;
            copyButton.style.cursor = "pointer";
            const copyButtonText = document.createElement("span");
            copyButtonText.textContent = "copy text";
            copyButtonText.style.height = "24px";
            shareToPawoo.firstElementChild.classList.forEach((currentClass) => {
                // actually I don't know what it is
                if (!currentClass.startsWith("gtm")) {
                    copyButtonText.classList.add(currentClass);
                }
            });
            copyButton.append(copyButtonText);
        }
        if (rawURL !== textToShare) {
            textToShare = process(rawURL);
            copyButton.onclick = copyText.bind(undefined, textToShare);
        }
        shareToPawoo.after(copyButton);
    });
    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });

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
