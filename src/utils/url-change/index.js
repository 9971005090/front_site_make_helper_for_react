// src/utils/url-change/index
import { COOKIE_AUTH } from "../../utils/cookie-auth";
const URL_CHANGE = {
    PROCESS: function(pathname = null) {
        let urlChange = null;
        const url = {
            controller: window.CONSTANTS.get(`APP.DEFAULT_URI`).CONTROLLER,
            action: window.CONSTANTS.get(`APP.DEFAULT_URI`).ACTION
        };
        const tempPath = pathname === null ? document.location.pathname.split(`/`).filter(Boolean) : pathname.split(`/`).filter(Boolean);
        if (COOKIE_AUTH.IS_AUTHENTICATED === true) {
            // 루트 접속 여부
            if (document.location.pathname !== `/`) {
                url['controller'] = tempPath[0];
                url['action'] = String.isNullOrWhitespace(tempPath[1]) === true ? `index` : tempPath[1];
            }
            else {
                urlChange = `${url['controller']}/${url['action']}`;
            }
        }
        else {
            url['controller'] = `login`;
            url['action'] = null;
            if (document.location.pathname.indexOf(`login`) === -1) {
                urlChange = `${url['controller']}`;
            }
        }
        if (urlChange !== null) {
            history.pushState({}, null, urlChange);
        }
        return url;
    }
};

export { URL_CHANGE };