
/**
 * 사이트에서 사용되는 환경 변수 상수
 * @fileoverview
 * - 사이트에서 사용되는 특정 기능에 대한 기본값, 계정별로 기능이 다를때 등등시에 사용되는 상수
 */

const SITE_ENVIRONMENT = {
    'MULTI_LANGUAGE': false,
    'DEFAULT_LANGUAGE_KEY': `en-US`,
    'KOREA_LANGUAGE_KEY': `ko-KR`,
    'TEST_KEY_FOR_USER_NAME': null
};
const SITE_ENVIRONMENT_FOR_CHANGE = function(changeInfo = null) {
    if (changeInfo === null) {
        return SITE_ENVIRONMENT;
    }
    for (let key in changeInfo) {
        if (Object.prototype.hasOwnProperty.call(SITE_ENVIRONMENT, key) === true) {
            SITE_ENVIRONMENT[key] = changeInfo[key];
        }
    }
    return SITE_ENVIRONMENT;
};
export { SITE_ENVIRONMENT, SITE_ENVIRONMENT_FOR_CHANGE };