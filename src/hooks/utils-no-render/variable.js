
/**
 * 구독이 되지 않게 리덕스 초기 데이타 로드 사용 커스텀 훅
 * @fileoverview
 * - 사이트별 초기 데이타 로드(사이트 접속 또는 로그인 후)가 필요할때 그 여부를 관리
 */

import _ from "lodash";
import { store } from "../../redux/slice/store";
import { _setValue, _setInit, _setAllDeleteIgnoreApp } from "../../redux/slice/variable";

/**
 * 초기 데이터 로드 여부 관리를 위한 커스텀 훅
 * @description
 * - 리덕스 스토어에서 로드 여부 상태를 직접 사용하고, 설정 처리
 *
 * @returns {Object} 로드 여부 관리 객체 반환
 * @property {boolean} isDone - 로드 여부 상태
 * @property {function} setIsDone - 로드 여부 상태 처리 함수
 */
export const useVariable = function() {
    const has = function(key) {
        const state = store.getState().variable._TqsrbxbzdTBAZtGWVfPLzGkfIEWqXV;
        return _.has(state, key);
    };
    const get = function(key) {
        const state = store.getState().variable._TqsrbxbzdTBAZtGWVfPLzGkfIEWqXV;
        return _.has(state, key) === true ? state[key] : null;
    };

    const set = function(key, value, force = false) {
        const currentValue = get(key);
        if (force === false && _.isEqual(currentValue, value)) {
            return;
        }
        store.dispatch(_setValue({ key, value, force }));
    };
    const init = function() {
        store.dispatch(_setInit());
    };
    const allDeleteIgnoreApp = function() {
        store.dispatch(_setAllDeleteIgnoreApp());
    };

    return { has, get, set, init, allDeleteIgnoreApp };
};