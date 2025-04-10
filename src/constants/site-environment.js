// src/constants/site-environment.js

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