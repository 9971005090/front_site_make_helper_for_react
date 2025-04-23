
/**
 * 리덕스 초기 데이타 로드 사용 커스텀 훅
 * @fileoverview
 * - 사이트별 초기 데이타 로드(사이트 접속 또는 로그인 후)가 필요할때 그 여부를 관리
 */

import { useSelector, useDispatch } from 'react-redux';
import { _selectIsDone, _setIsDone } from '../redux/slice/first-load';

/**
 * 초기 데이터 로드 여부 관리를 위한 커스텀 훅
 * @description
 * - 리덕스 스토어에서 초기 데이터 로드 여부를 확인하고 업데이트하는 커스텀 훅
 *
 * @returns {Object} 로드 여부 관리 객체 반환
 * @property {boolean} isDone - 초기 데이터 로드 완료 여부
 * @property {function} setIsDone - 초기 데이터 로드 상태를 설정하는 함수
 */
const useFirstLoad = function() {
    const isDone = useSelector(_selectIsDone);
    const dispatch = useDispatch();

    const setIsDone = (isDone) => {
        dispatch(_setIsDone(isDone));
    };

    return { isDone, setIsDone };
};

export { useFirstLoad };
