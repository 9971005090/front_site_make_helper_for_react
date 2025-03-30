// src/redux/slice/auth.js

import { createSlice } from '@reduxjs/toolkit';
import Cookies from "js-cookie";
import { useSelector } from 'react-redux';
import {format} from "date-fns";

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
            console.log(`login 완료 - ${format(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS')}`);
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