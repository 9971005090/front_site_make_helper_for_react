// src/redux/slice/auth.js

import { createSlice } from '@reduxjs/toolkit';
import Cookies from "js-cookie";
import { useSelector } from 'react-redux';

const cookieToken = Cookies.get("token");
const cookieId = Cookies.get("seers_id");
const cookieUserInfo = cookieToken ? JSON.parse(Cookies.get("userInfo")) : null;
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
            state._user = null; // 로그아웃 시 사용자 정보 초기화
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