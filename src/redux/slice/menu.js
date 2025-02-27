// src/redux/menuSlice.js

import { createSlice } from '@reduxjs/toolkit';

const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        _headerChange: false,
        _leftChange: false,
    },
    reducers: {
        _setHeaderChange(state) {
            state._headerChange = !state._headerChange;
        },
        _setLeftChange(state) {
            state._leftChange = !state._leftChange;
        },
    },
});
export const _selectIsHeaderChange = function(state) {
    return state.menu._headerChange;
};
export const _selectIsLeftChange = function(state) {
    return state.menu._leftChange;
};
export const { _setHeaderChange, _setLeftChange } = menuSlice.actions;
export default menuSlice.reducer;
