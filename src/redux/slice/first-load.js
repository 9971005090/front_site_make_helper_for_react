// src/redux/first-load.js

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
