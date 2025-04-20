// src/utils/initialize-app.js
import { GET_CONSTANTS } from "../constants/global-set-constants";
import { APP as APP_CONSTANT } from "../constants/app";
import { USER as USER_CONSTANT } from "../constants/user-level";
import { COMMON_RESPONSE_CODE as COMMON_RESPONSE_CODE_CONSTANT } from "../constants/common-response-code";
import { SET as SITE_ENVIRONMENT_FOR_SET } from "../utils/environment/index";

/**
 * 사이트 로딩 전 필수 파일, 함수, 전역변수, 환경변수 로딩 처리
 * @param {object} setInterval 로 생성된 객체
 * @param {number} milliSeconds clearInterval를 실행하기 위한 시간(ms)
 * @description 사이트 로딩 전 필수 <파일, 함수, 전역/환경 변수> 를 로딩 처리하는 함수,
 * @returns {void}
 */
const INITIALIZE_APP = async function() {
    try {
        await import(`../utils/extensions/array`);
        await import(`../utils/extensions/date`);
        await import(`../utils/extensions/file`);
        await import(`../utils/extensions/number`);
        await import(`../utils/extensions/string`);
        window.CONSTANTS = GET_CONSTANTS(APP_CONSTANT);
        window.CONSTANTS.set(`APP.USER_LEVEL`, USER_CONSTANT.LEVEL);
        window.CONSTANTS.set(`APP.USER_LIMIT`, USER_CONSTANT.LIMIT);
        window.CONSTANTS.set(`APP.API.RESPONSE_CODE`, COMMON_RESPONSE_CODE_CONSTANT);
        SITE_ENVIRONMENT_FOR_SET();
        return true;
    }
    catch (error) {
        console.error('앱 초기화 실패:', error);
        return false;
    }
};

export { INITIALIZE_APP };