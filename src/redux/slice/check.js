// src/redux/checkSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {format} from "date-fns";

const checkSlice = createSlice({
    name: 'check',
    initialState: {
        '_urlChange': false,
        '_navigateChange': false
    },
    reducers: {
        _setUrlChange(state, action) {
            state._urlChange = action.payload;
        },
        _setNavigateChange(state, action) {
            state._navigateChange = action.payload;
        },
    },
});

export const _selectIsUrlChange = function(state) {
    return state.check._urlChange;
};
export const _selectIsNavigateChange = function(state) {
    return state.check._navigateChange;
};
export const { _setUrlChange, _setNavigateChange } = checkSlice.actions;
export default checkSlice.reducer;
