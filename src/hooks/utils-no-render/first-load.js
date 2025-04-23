
/**
 * 구독이 되지 않게 리덕스 초기 데이타 로드 사용 커스텀 훅
 * @fileoverview
 * - 사이트별 초기 데이타 로드(사이트 접속 또는 로그인 후)가 필요할때 그 여부를 관리
 */

import { store } from "../../redux/slice/store";
import { _setIsDone } from "../../redux/slice/first-load";

/**
 * 초기 데이터 로드 여부 관리를 위한 커스텀 훅
 * @description
 * - 리덕스 스토어에서 로드 여부 상태를 직접 사용하고, 설정 처리
 *
 * @returns {Object} 로드 여부 관리 객체 반환
 * @property {boolean} isDone - 로드 여부 상태
 * @property {function} setIsDone - 로드 여부 상태 처리 함수
 */
export const useFirstLoad = function() {
    const isDone = store.getState().firstLoad._isDone;
    const setIsDone = function(value) {
        store.dispatch(_setIsDone(value));
    };

    return { isDone, setIsDone };
};