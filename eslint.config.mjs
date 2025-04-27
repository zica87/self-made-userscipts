import globals from "globals";
import pluginJs from "@eslint/js";
import userscripts from "eslint-plugin-userscripts";

export default [
    pluginJs.configs.recommended,
    {
        files: ["**/*.js"],
        languageOptions: {
            sourceType: "script",
            globals: {
                ...globals.browser,
                ...globals.es2025,
                ...globals.greasemonkey,
            },
        },
        plugins: {
            userscripts: {
                rules: userscripts.rules,
            },
        },
        rules: {
            ...userscripts.configs.recommended.rules,
            "userscripts/filename-user": "off",
            "userscripts/compat-grant": "error",
            "userscripts/compat-headers": "error",
            "no-unused-vars": "warn",
        },
        settings: {
            userscriptVersions: {
                // just some random modern versions
                tampermonkey: ">=5",
                greasemonkey: ">=4.11",
                violentmonkey: ">=2.15",
            },
        },
    },
];
