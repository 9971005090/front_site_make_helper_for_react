
/**
 * 인증 관련 리덕스 슬라이스 파일
 * @fileoverview
 * - 사용자 인증 상태 및 정보를 관리하는 Redux Slice
 * - 쿠키를 활용하여 로그인 유지 기능을 제공
 */

import { createSlice } from '@reduxjs/toolkit';
import Cookies from "js-cookie";

const cookieToken = Cookies.get("accessToken");
const cookieId = Cookies.get("seers_id");
const cookieUserInfo = cookieToken ? JSON.parse(Cookies.get(`userAccount`)) : null;
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        _isAuthenticated: cookieToken ? true : false,
        _user: cookieUserInfo,
        _token: cookieToken ? cookieToken : null,
        _cookieId: cookieId ? cookieId : null
    },
    reducers: {
        _login(state, action) {
            state._isAuthenticated = true;
            state._user = action.payload.userAccount; // 로그인 시 사용자 정보 저장
            state._token = action.payload.accessToken; // 로그인 시 사용자 정보 저장
        },
        _logout(state) {
            state._isAuthenticated = false;
            state._user = null;
            state._token = null;
        },
        _setRemember(state, action) {
            state._cookieId = action.payload.id;
        },
        _removeRemember(state) {
            state._cookieId = null;
        }
    },
});

export const _selectIsAuthenticated = function(state) {
    return state.auth._isAuthenticated;
};
export const _selectUser = function(state) {
    return state.auth._user;
};
export const _selectToken = function(state) {
    return state.auth._token;
};
export const _selectCookieId = function(state) {
    return state.auth._cookieId;
};


export const { _login, _logout, _setRemember, _removeRemember } = authSlice.actions;
export default authSlice.reducer;