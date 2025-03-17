
import Cookies from "js-cookie";

const cookieToken = Cookies.get("token") ? Cookies.get("token") : null;
const cookieId = Cookies.get("seers_id") ? Cookies.get("seers_id") : null;
const cookieUserInfo = cookieToken ? JSON.parse(Cookies.get("userInfo")) : null;
console.log("cookieToken:::::", cookieToken);
const COOKIE_AUTH = {
    IS_AUTHENTICATED: cookieToken !== null && cookieUserInfo !== null ? true : false,
    GET: {
        TOKEN: cookieToken,
        USER: cookieUserInfo
    },
    SET: function(userData = null) {
        if (userData !== null) {
            Cookies.set("token", userData.accessToken);
            Cookies.set("userInfo", JSON.stringify(userData.userAccount));
            this.IS_AUTHENTICATED = true;
        }
        else {
            Cookies.remove('token');
            Cookies.remove('userInfo');
            this.IS_AUTHENTICATED = false;
        }
    }
};

export { COOKIE_AUTH };