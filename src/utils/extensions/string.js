
/**
 * String 객체 확장 유틸리티
 * @fileoverview
 * - String 객체에 커스텀 메서드를 추가하여 기능 확장
 */

if (typeof String.isNullOrWhitespace !== "function") {
    /**
     * 문자열이 null, 공백 또는 공백 문자만 포함하는지 확인하는 함수
     *
     * @function
     * @param {string} text - 확인할 문자열
     * @returns {boolean} 문자열이 null 또는 공백이면 true, 그렇지 않으면 false
     *
     * @description
     * - `undefined`, `null`, 빈 문자열, 공백 문자만 포함한 문자열을 true로 반환
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
    /**
     * 유효한 값인지 확인하고, 공백 또는 null일 경우 null을 반환하는 함수
     *
     * @function
     * @param {string} value - 유효성을 검사할 값
     * @returns {string|null} 유효한 값이면 문자열을, 그렇지 않으면 null을 반환
     */
    String.getValidValue = function (value) {
        return String.isNullOrWhitespace(value) ? null : (typeof value === "string" ? value.trim(): value);
    };
}
if (typeof String.getUrlParam !== "function") {
    /**
     * URL에서 쿼리 파라미터를 객체로 반환하는 함수
     *
     * @function
     * @param {string} url - URL 문자열
     * @returns {Object|null} 쿼리 파라미터 객체, URL이 null일 경우 null
     *
     * @description
     * - URL 내의 쿼리 파라미터를 key-value 형식의 객체로 반환
     * - 예: `?id=1&name=test` -> `{ id: "1", name: "test" }`
     */
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
    /**
     * 문자열을 지정된 길이에 맞게 지정된 문자로 채우는 함수
     *
     * @function
     * @param {string|number} value - 채울 대상 값 (숫자도 문자열로 처리)
     * @param {number} length - 채울 길이
     * @param {string} [fillString="0"] - 채울 문자 (기본값은 "0")
     * @param {string} [type="start"] - 채우는 위치 ("start" 또는 "end")
     * @returns {string} 지정된 길이에 맞게 채운 문자열
     *
     * @description
     * - `type`에 따라 문자열의 앞(시작) 또는 뒤(끝)에 `fillString`을 채워 지정된 길이를 맞춤
     */
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
    /**
     * 전화번호를 특정 형식으로 포맷하는 함수
     *
     * @function
     * @param {string} num - 포맷할 전화번호
     * @param {boolean} [useStar=false] - 중간 번호를 `*`로 표시할지 여부
     * @returns {string} 포맷된 전화번호
     *
     * @description
     * - 11자리 전화번호를 "xxx-xxxx-xxxx" 또는 "xxx-****-xxxx" 형식으로 포맷
     */
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
    /**
     * 문자열이 JSON 형식인지 확인하는 함수
     *
     * @function
     * @param {string} str - 확인할 문자열
     * @returns {Object|boolean} JSON 형식이면 객체를 반환, 아니면 false
     *
     * @description
     * - 문자열이 유효한 JSON 형식이라면 해당 JSON 객체를 반환, 아니면 `false`를 반환
     */
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
    /**
     * 지정된 길이만큼 랜덤 문자열을 생성하는 함수
     *
     * @function
     * @param {number} num - 생성할 랜덤 문자열의 길이
     * @returns {string} 생성된 랜덤 문자열
     *
     * @description
     * - 영문 대소문자로 구성된 랜덤 문자열을 반환
     */
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


export default null; // 별도로 내보낼 것은 없으므로 기본값 null