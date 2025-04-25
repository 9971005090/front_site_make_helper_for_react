
/**
 * 인증 관련 리덕스 슬라이스 파일
 * @fileoverview
 * - 사용자 인증 상태 및 정보를 관리하는 Redux Slice
 * - 쿠키를 활용하여 로그인 유지 기능을 제공
 */

import { createSlice } from '@reduxjs/toolkit';
import _ from "lodash"; // Lodash 사용


const globalKeyPreFix = ['APP', 'GLOBAL'];
const globalMergeKey = ['CONSTANTS'];

function has(state, key) {
    // return Object.prototype.hasOwnProperty.call(state._TqsrbxbzdTBAZtGWVfPLzGkfIEWqXV, key);
    return _.has(state._TqsrbxbzdTBAZtGWVfPLzGkfIEWqXV, key);
}
function get(state, key) {
    return has(state, key) ? state._TqsrbxbzdTBAZtGWVfPLzGkfIEWqXV[key] : null;
}
function del(state, key) {
    if (has(state, key) === true) {
        delete state._TqsrbxbzdTBAZtGWVfPLzGkfIEWqXV[key];
    }
}
const variableSlice = createSlice({
    name: 'variable',
    initialState: {
        _TqsrbxbzdTBAZtGWVfPLzGkfIEWqXV: {}
    },
    reducers: {
        _setValue: function(state, action) {
            const { key, value, force = false } = action.payload;

            function _set(val) {
                state._TqsrbxbzdTBAZtGWVfPLzGkfIEWqXV[key] = val;
            }

            if (force) {
                if (globalMergeKey.includes(key)) {
                    const _check = has(state, key) === true ? get(state, key) : {};
                    Object.assign(_check, value);
                    _set(_check);
                } else {
                    _set(value);
                }
            } else if (has(state, key) === false) {
                _set(value);
            }
        },
        _setInit: function(state) {
            let checkKeyName = null;
            for (let key in state._TqsrbxbzdTBAZtGWVfPLzGkfIEWqXV) {
                checkKeyName = key.split(`.`)[0];
                if (globalKeyPreFix.indexOf(checkKeyName) === -1) {
                    del(state, key);
                }
            }
        },
        _setAllDeleteIgnoreApp: function(state) {
            let checkKeyName = null;
            for (let key in state._TqsrbxbzdTBAZtGWVfPLzGkfIEWqXV) {
                let checkGlobalKeyPreFix = globalKeyPreFix[0];
                checkKeyName = key.split(`.`)[0];
                if (checkGlobalKeyPreFix.indexOf(checkKeyName) === -1) {
                    del(state, key);
                }
            }
        }
    }
});


export const _selectValue = function(state) {
    return state.variable._TqsrbxbzdTBAZtGWVfPLzGkfIEWqXV;
};


export const { _setValue, _setInit, _setAllDeleteIgnoreApp } = variableSlice.actions;
export default variableSlice.reducer;