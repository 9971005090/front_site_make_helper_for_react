// src/utils/extensions/string.js

/**
 * String object 확장
 */
if (typeof String.isNullOrWhitespace !== "function") {
    /**
     * Whitespace 거나 NULL 이면 true 반환
     *
     * @param {string} text
     * @returns {boolean}
     */
    String.isNullOrWhitespace = function (text) {
        if (typeof(text) === `undefined`) {
            return true;
        }
        if (text === null || text === ``) {
            return true;
        }
        if (typeof text === `string` && text.trim().length === 0) {
            return true;
        }
        if (typeof text === `object` && Object.keys(text).length === 0) {
            return true;
        }
        return false;
    };
}
if (typeof String.getValidValue !== "function") {
    String.getValidValue = function (value) {
        return String.isNullOrWhitespace(value) ? null : (typeof value === "string" ? value.trim(): value);
    };
}
if (typeof String.getUrlParam !== "function") {
    String.getUrlParam = function (url) {
        if (url == null) {
            return null;
        }
        let params = {};
        url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (str,key,value) {
            params[key] = decodeURIComponent(value);
        });
        return params;
    };
}
if (typeof String.setFillString !== "function") {
    String.setFillString = function (value, length, fillString = "0", type = "start") {
        if (typeof value === "number") {
            value = String(value);
        }
        if (typeof value !== "string") {
            return value;
        }
        if (type == "start") {
            return value.padStart(length, fillString);
        }
        else if (type == "end") {
            return value.padEnd(length, fillString);
        }
        return value;
    };
}
if (typeof String.phoneFormatter !== "function") {
    String.phoneFormatter = function (num, useStar = false) {
        let formatNum = "";
        if (num.length == 11) {
            if (useStar === true) {
                formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-****-$3');
            }
            else {
                formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
            }
        }
        return formatNum;
    };
}
if (typeof String.isJson !== "function") {
    String.isJson = function (str) {
        try {
            let jsonObject = JSON.parse(str);
            if (typeof jsonObject === 'object') {
                return jsonObject;
            }
            else {
                return false;
            }
        } catch (e) {
            return false;
        }
    };
}
if (typeof String.generateRandom !== "function") {
    String.generateRandom = function (num) {
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < num; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    };
}
if (typeof String.isLayoutNeeded !== "function") {
    /**
     * 컨트롤러가 레이아웃을 필요로 하는지 확인
     *
     * @param {string} value 컨트롤러 명
     * @returns {boolean}
     */
    String.isLayoutNeeded = function (value) {
        if (String.isNullOrWhitespace(value) === true) {
            return false;
        }
        if (window.CONSTANTS.get(`APP.LAYOUT.IGNORE_CONTROLLER_NAMES`).indexOf(value) !== -1) {
            return false;
        }
        return true;
    };
}


export default null; // 별도로 내보낼 것은 없으므로 기본값 null