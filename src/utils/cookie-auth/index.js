
import Cookies from "js-cookie";

const cookieToken = Cookies.get("accessToken") ? Cookies.get("accessToken") : null;
const cookieId = Cookies.get("seers_id") ? Cookies.get("seers_id") : null;
const cookieUserInfo = cookieToken ? JSON.parse(Cookies.get("userAccount")) : null;
const COOKIE_AUTH = {
    IS_AUTHENTICATED: cookieToken !== null && cookieUserInfo !== null ? true : false,
    GET: {
        TOKEN: cookieToken,
        USER: cookieUserInfo
    },
    SET: function(userData = null) {
        if (userData !== null) {
            this.IS_AUTHENTICATED = true;
        }
        else {
            this.IS_AUTHENTICATED = false;
        }
    }
};

export { COOKIE_AUTH };