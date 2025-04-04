// /src/hooks/utils-no-render/auth.js

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