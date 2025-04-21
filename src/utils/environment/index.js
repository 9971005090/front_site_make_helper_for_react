
/**
 * 사이트 환경 변수를 전역 변수에 설정
 * @fileoverview
 * - 사이트 로딩시, 로그인 후에 사이트 환경 변수를 전역 변수에 설정한다.
 *   로그인 후에도 하는 이유는 계정에 따라 변경되는 값이 있을 수 있기 때문이다.
 */

import { SITE_ENVIRONMENT as SITE_ENVIRONMENT_CONSTANT, SITE_ENVIRONMENT_FOR_CHANGE } from "../../constants/site-environment";
import { useAuth as useAuthNoRender } from "../../hooks/utils-no-render/auth";

/**
 * 사이트 환경 변수를 전역 변수에 설정하는 함수
 *
 * @description
 *  - 내부에서 사이트 환경 변수 상수를 로딩하여, 전역 변수 관리에 설정을 한다.
 *    다만! 인증후에 변경되는 부분은 사이트별로 수정을 한다.
 *
 * @example
 *  import { SET as SITE_ENVIRONMENT_FOR_SET } from "../utils/environment/index";
 *  SITE_ENVIRONMENT_FOR_SET();
 *
 * @returns {void}
 */
const SET = function() {
    const { isAuthenticated, user } = useAuthNoRender();

    if (isAuthenticated === true) {
        SITE_ENVIRONMENT_FOR_CHANGE({
            'TEST_KEY_FOR_USER_NAME': user.name
        });
    }
    for (let key in SITE_ENVIRONMENT_CONSTANT) {
        if (Object.prototype.hasOwnProperty.call(SITE_ENVIRONMENT_CONSTANT, key) === true) {
            window.CONSTANTS.set(`GLOBAL.${key}`, SITE_ENVIRONMENT_CONSTANT[key], true);
        }
    }
};
export { SET };