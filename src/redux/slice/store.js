// src/redux/slice/store.js
import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './language';
import authReducer from './auth';
import menuReducer from './menu';

export const store = configureStore({
    reducer: {
        language: languageReducer,
        auth: authReducer,
        menu: menuReducer
    },
});
