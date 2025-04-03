// src/hooks/auth.js
import { useSelector, useDispatch } from 'react-redux';
import Cookies from "js-cookie";
import { _selectIsAuthenticated, _selectUser, _selectToken, _selectCookieId, _login, _logout, _setRemember, _removeRemember } from '../redux/slice/auth';
import { COOKIE_AUTH } from '../utils/cookie-auth/index';

export const useAuth = function() {
    const isAuthenticated = useSelector(_selectIsAuthenticated);
    const user = useSelector(_selectUser);
    const token = useSelector(_selectToken);
    const cookieId = useSelector(_selectCookieId);
    const dispatch = useDispatch();

    const login = (userData) => {
        dispatch(_login(userData));
        Cookies.set("accessToken", userData.accessToken);
        Cookies.set("userAccount", JSON.stringify(userData.userAccount));
        COOKIE_AUTH.SET(userData);
    };

    const logout = function() {
        dispatch(_logout());
        Cookies.remove('accessToken');
        Cookies.remove('userAccount');
        COOKIE_AUTH.SET();
    };

    const setRemember = (remember) => {
        dispatch(_setRemember(remember));
        Cookies.set("seers_id", remember.id, { expires: 365 * 100 });
    };

    const removeRemember = function() {
        dispatch(_removeRemember());
        Cookies.remove("seers_id");
    };

    return { isAuthenticated, user, cookieId, token, login, logout, setRemember, removeRemember };
};
