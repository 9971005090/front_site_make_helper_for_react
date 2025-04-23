
/**
 * 리덕스 인증 사용 커스텀 훅
 * @fileoverview
 * - 리덕스 툴킷을 사용하여 인증 관련 상태를 관리하는 커스텀 훅
 * - 사용자 로그인, 로그아웃, 아이디 기억하기/제거하기 기능을 제공
 */

import { useSelector, useDispatch } from 'react-redux';
import Cookies from "js-cookie";
import { _selectIsAuthenticated, _selectUser, _selectToken, _selectCookieId, _login, _logout, _setRemember, _removeRemember } from '../redux/slice/auth';

/**
 * 인증 관리를 위한 커스텀 훅
 * @description
 * - Redux 상태에서 인증 관련 정보를 가져오고, 로그인/로그아웃 기능, 아이디 기억하기/제거하기 기능을 제공하는 커스텀 훅
 *
 * @returns {Object} 인증 관련 상태 및 메서드를 포함한 객체 반환
 * @property {boolean} isAuthenticated - 사용자의 인증 여부
 * @property {Object} user - 사용자 정보 객체
 * @property {string} token - 현재 인증 토큰
 * @property {string} cookieId - 저장된 쿠키 ID
 * @property {function} login - 사용자 로그인 처리 함수
 * @property {function} logout - 사용자 로그아웃 처리 함수
 * @property {function} setRemember - 아이디 기억하기 처리 함수
 * @property {function} removeRemember - 아이디 제거하기 처리 함수
 */
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
    };

    const logout = function() {
        dispatch(_logout());
        Cookies.remove('accessToken');
        Cookies.remove('userAccount');
    };

    const setRemember = function(remember) {
        dispatch(_setRemember(remember));
        Cookies.set("seers_id", remember.id, { expires: 365 * 100 });
    };

    const removeRemember = function() {
        dispatch(_removeRemember());
        Cookies.remove("seers_id");
    };

    return { isAuthenticated, user, cookieId, token, login, logout, setRemember, removeRemember };
};
