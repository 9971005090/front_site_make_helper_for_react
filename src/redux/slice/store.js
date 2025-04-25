
/**
 * Redux 스토어 설정 파일
 * @fileoverview
 * - Redux Toolkit을 사용하여 전역 상태 관리 스토어를 설정
 * - 인증 상태(auth) 및 초기 데이터 로드 상태(firstLoad)를 관리하는 리듀서를 포함
 */

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import firstLoadReducer from './first-load';
import variableReducer from './variable';

/**
 * Redux 스토어 생성
 * @description
 * - `configureStore`를 사용하여 Redux 스토어를 설정
 * - `reducer` 객체에 여러 개의 리듀서를 등록하여 상태를 관리
 *
 * @property {Object} reducer - 애플리케이션의 상태를 관리하는 리듀서 목록
 * @property {Function} reducer.auth - 인증 관련 상태 관리 리듀서
 * @property {Function} reducer.firstLoad - 초기 데이터 로드 상태 관리 리듀서
 */
export const store = configureStore({
    reducer: {
        auth: authReducer,
        firstLoad: firstLoadReducer,
        variable: variableReducer,
    },
});
