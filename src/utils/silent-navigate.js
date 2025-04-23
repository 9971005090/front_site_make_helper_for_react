
/**
 * 브라우저의 히스토리를 변경하면서 화면을 새로고침하지 않고 URL을 변경하는 유틸리티 파일
 * @fileoverview
 * - `window.history.pushState`를 사용하여 URL을 변경함.
 * - `popstate` 이벤트를 발생시켜 리액트 라우터 등의 상태 변경을 트리거할 수 있음.
 */

/**
 * 화면 새로고침 없이 URL을 변경하는 함수
 * @description
 * - fileoverview 참조
 *
 * @param {string} newPath - 변경할 URL 경로
 * @param {Object} [state={}] - 히스토리에 저장할 상태 객체 (기본값: 빈 객체)
 * @param {string|null} [title=null] - 문서 제목 (기본값: null, 현재 변경되지 않음)
 * @returns {void}
 */
const silentNavigate = function(newPath, state = {}, title = null) {
    window.history.pushState(state, title, newPath);
    window.dispatchEvent(new PopStateEvent(`popstate`));
};

export { silentNavigate };