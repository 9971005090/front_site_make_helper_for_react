
/**
 * 초기 데이타 로드 유무 상태 관련 리덕스 슬라이스 파일
 * @fileoverview
 * - 사이트 최초 접속때나 로그인 후 초기 데이타 로드 유무 상태 관리 기능 제공
 */

import { createSlice } from '@reduxjs/toolkit';

const firstLoadSlice = createSlice({
    name: 'firstLoad',
    initialState: {
        _isDone: false,
    },
    reducers: {
        _setIsDone(state, action) {
            state._isDone = action.payload;
        }
    },
});
export const _selectIsDone = function(state) {
    return state.firstLoad._isDone;
};
export const { _setIsDone } = firstLoadSlice.actions;
export default firstLoadSlice.reducer;
