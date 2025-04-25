
/**
 * 사이트 최초 접속시 기본 적인 내용 처리 파일
 * @fileoverview
 * 확장함수, 전역상수 설정, 사이트별 전역 상수 설정 처리
 */

import { GET_CONSTANTS } from "../constants/global-set-constants";
import { APP as APP_CONSTANT } from "../constants/app";
import { USER as USER_CONSTANT } from "../constants/user-level";
import { COMMON_RESPONSE_CODE as COMMON_RESPONSE_CODE_CONSTANT } from "../constants/common-response-code";
import { SET as SITE_ENVIRONMENT_FOR_SET } from "../utils/environment/index";
import { useVariable as useVariableNoRender } from "../hooks/utils-no-render/variable";


/**
 * 애플리케이션 초기화 함수
 * @async
 * @description
 * - 사이트 최초 접속 시 실행되며, 확장 함수 로드 및 전역 상수를 설정
 *
 * @returns {Promise<boolean>} 초기화 성공 시 true 반환, 실패 시 false 반환
 */
const INITIALIZE_APP = async function() {
    const { set: setVariable } = useVariableNoRender();

    try {
        await import(`../utils/extensions/custom`);
        await import(`../utils/extensions/array`);
        await import(`../utils/extensions/date`);
        await import(`../utils/extensions/file`);
        await import(`../utils/extensions/number`);
        await import(`../utils/extensions/string`);
        // window.CONSTANTS = GET_CONSTANTS(APP_CONSTANT);
        // window.CONSTANTS.set(`APP.USER_LEVEL`, USER_CONSTANT.LEVEL);
        // window.CONSTANTS.set(`APP.USER_LIMIT`, USER_CONSTANT.LIMIT);
        // window.CONSTANTS.set(`APP.API.RESPONSE_CODE`, COMMON_RESPONSE_CODE_CONSTANT);
        SITE_ENVIRONMENT_FOR_SET();

        if (APP_CONSTANT !== null) {
            for (let key in APP_CONSTANT) {
                setVariable(key, APP_CONSTANT[key], true);
            }
        }
        setVariable(`APP.USER_LEVEL`, USER_CONSTANT.LEVEL);
        setVariable(`APP.USER_LIMIT`, USER_CONSTANT.LIMIT);
        setVariable(`APP.API.RESPONSE_CODE`, COMMON_RESPONSE_CODE_CONSTANT);

        return true;
    }
    catch (error) {
        console.error('앱 초기화 실패:', error);
        return false;
    }
};

export { INITIALIZE_APP };