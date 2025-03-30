// js/init/auth/post-check.js
import { Notify } from '../../utils/global-utils';

const POST_CHECK = function(userLevel, error = {isUse: false, msg: null}) {
    let response = `OK`;

    // 아래 영역에 코드 작성
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    if (window.CONSTANTS.get(`GLOBAL.USER_LIMIT`).LEVEL.indexOf(userLevel) === -1) {
        response = `AUTH_FAIL`;
        if (error.isUse === true) {
            error.msg = error.msg === null ? window.CONSTANTS.get(`GLOBAL.USER_LIMIT`).MESSAGE : error.msg;
            Notify(`top-center`, error.msg, `error`);
        }
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    return response;
};

export { POST_CHECK };
