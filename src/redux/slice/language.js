import { createSlice } from '@reduxjs/toolkit';

const languageSlice = createSlice({
    name: 'language',
    initialState: {
        currentLanguage: 'en', // 기본 언어: 영어
        languages: ['en', 'ko', 'fr'], // 지원하는 언어 목록
    },
    reducers: {
        setLanguage(state, action) {
            state.currentLanguage = action.payload; // 언어 변경
        },
    },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
