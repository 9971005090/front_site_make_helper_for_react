// src/utils/url-change/index
import { COOKIE_AUTH } from "../../utils/cookie-auth";
import { POST_CHECK as AUTH_POST_CHECK } from '../../init/auth/post-check';
const URL_CHANGE = {
    PROCESS: function(location = null) {
        const _connect_root = function() {
            if (document.location.pathname !== `/`) {
                url['controller'] = tempPath[0];
                url['action'] = String.isNullOrWhitespace(tempPath[1]) === true ? `index` : tempPath[1];
            }
            else {
                url.change.path = `${url['controller']}/${url['action']}`;
            }
        };
        const url = {
            'controller': window.CONSTANTS.get(`APP.DEFAULT_URL`).CONTROLLER,
            'action': window.CONSTANTS.get(`APP.DEFAULT_URL`).ACTION,
            'change': {
                'path': null,
                'controller': false,
                'action': false
            }
        };
        const backTempPath = (location !== null && location.state !== null) ? location.state.back.split(`/`).filter(Boolean) : null;
        const tempPath = (location === null || location.pathname === null) ? document.location.pathname.split(`/`).filter(Boolean) : location.pathname.split(`/`).filter(Boolean);

        if (COOKIE_AUTH.IS_AUTHENTICATED === true) {
            if (location === null) {
                const _r = AUTH_POST_CHECK(COOKIE_AUTH.GET.USER.level, {isUse: true, msg: null});
                if (_r === `AUTH_FAIL`) {
                    url['controller'] = `login`;
                    url['action'] = null;
                    if (document.location.pathname.indexOf(`login`) === -1) {
                        url.change.path = `/${url['controller']}`;
                    }
                }
                else {
                    // 루트 접속 여부
                    _connect_root();
                }
            }
            else {
                // 루트 접속 여부
                _connect_root();
            }
        }
        else {
            url['controller'] = `login`;
            url['action'] = null;
            if (document.location.pathname.indexOf(`login`) === -1) {
                url.change.path = `/${url['controller']}`;
            }
        }
        // url 가공 여부 확인(루트나 인증이 안됐을 경우, url 영역에 표시를 해주기 위해서)
        if (url.change.path !== null) {
            history.pushState({}, null, url.change.path);
        }
        // controller 나 action 이 변경됐는지 확인(래더링에 영향을 주지 않는 전역 변수 초기화를 위해)
        if (backTempPath === null) {
            url.change.controller = true;
            url.change.action = true;
        }
        else if (backTempPath[0] !== tempPath[0]) {
            url.change.controller = true;
        }
        else if (backTempPath[1] !== tempPath[1]) {
            url.change.action = true;
        }
        return url;
    }
};

export { URL_CHANGE };