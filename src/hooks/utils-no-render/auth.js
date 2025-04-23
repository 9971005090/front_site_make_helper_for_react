
/**
 * 구독이 되지 않게 리덕스 인증 사용 커스텀 훅
 * @fileoverview
 * - 기본적으로 React 훅은 상태값을 구독하기 때문에 값이 변경되면 해당 값을 사용하는 모든 컴포넌트가 재렌더링 된다.
 * - 그러나 이 훅은 리덕스 스토어에서 직접 값을 사용하고, 리덕스 액션을 통해 상태를 변경하는 방식으로 설계되어 재렌더링을 방지하며 상태를 변경할 수 있도록 처리
 * - 이 훅은 인증 상태를 관리하며 로그인, 로그아웃, 쿠키 설정
 */

import { store } from "../../redux/slice/store";
import { _login, _logout, _setRemember, _removeRemember } from "../../redux/slice/auth";
import Cookies from "js-cookie";

/**
 * 인증 관리를 위한 커스텀 훅
 * @returns {Object} 인증 관련 상태 및 로그인/로그아웃, 아이디 기억/제거(쿠키 설정) 함수 반환
 * - 리덕스 스토어에서 인증 상태를 직접 사용하고, 로그인, 로그아웃, 쿠키 설정 등을 처리
 */
export const useAuth = function() {
    const isAuthenticated = store.getState().auth._isAuthenticated;
    const user = store.getState().auth._user;
    const token = store.getState().auth._token;
    const cookieId = store.getState().auth._cookieId;

    /**
     * 로그인 함수
     * @param {object} userData - 로그인 시 받은 사용자 정보 (예: accessToken, userAccount 등)
     * - 리덕스 스토어에 로그인 정보를 저장하고, 쿠키에 인증 토큰과 사용자 정보를 설정
     */
    const login = function(userData) {
        store.dispatch(_login(userData));
        Cookies.set("accessToken", userData.accessToken);
        Cookies.set("userAccount", JSON.stringify(userData.userAccount));
    };

    /**
     * 로그아웃 함수
     * - 리덕스 스토어에서 인증 정보를 삭제하고, 관련 쿠키를 제거
     */
    const logout = function() {
        store.dispatch(_logout());
        Cookies.remove('accessToken');
        Cookies.remove('userAccount');
    };

    /**
     * 아이디 기억 기능 활성화함수
     * @param {object} remember - 기억할 사용자 정보 (예: id)
     * - 리덕스 스토어에 'remember me' 정보를 저장
     */
    const setRemember = function(remember) {
        store.dispatch(_setRemember(remember));
    };
    const removeRemember = function() {
        store.dispatch(_removeRemember());
    };

    return { isAuthenticated, user, token, cookieId, login, logout, setRemember, removeRemember };
};