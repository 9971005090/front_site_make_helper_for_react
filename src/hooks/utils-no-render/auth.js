
/**
 * 구독이 되지 않게 리덕스 인증 사용 훅
 * @fileoverview
 * - 기본적으로 훅은 구독이 되기 때문에, 변경시 해당 값을 사용하는 콤포넌트는 모두 재랜더링이 된다.
 *   그러나! 재랜더링이 되지 않고, 값만 사용하기 위해 처리된 훅이다.
 *   값의 변경도 포함된다.
 *   store 자체 함수를 이용해서 가능하다.
 */

import { store } from "../../redux/slice/store";
import { _login, _logout, _setRemember, _removeRemember } from "../../redux/slice/auth";
import Cookies from "js-cookie";

export const useAuth = function() {
    const isAuthenticated = store.getState().auth._isAuthenticated;
    const user = store.getState().auth._user;
    const token = store.getState().auth._token;
    const cookieId = store.getState().auth._cookieId;
    const login = function(userData) {
        store.dispatch(_login(userData));
        Cookies.set("accessToken", userData.accessToken);
        Cookies.set("userAccount", JSON.stringify(userData.userAccount));
    };
    const logout = function() {
        store.dispatch(_logout());
        Cookies.remove('accessToken');
        Cookies.remove('userAccount');
    };
    const setRemember = function(remember) {
        store.dispatch(_setRemember(remember));
    };
    const removeRemember = function() {
        store.dispatch(_removeRemember());
    };

    return { isAuthenticated, user, token, cookieId, login, logout, setRemember, removeRemember };
};