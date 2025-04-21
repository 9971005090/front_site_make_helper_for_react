
/**
 * 브라우저 history 상태를 변경 파일
 * @fileoverview
 * - URL을 변경하여 브라우저 기록을 관리하는 기능을 제공
 * - `window.history.pushState`를 활용하여 동적 라우터 기능 구현
 */

/**
 * 현재 브라우저의 history 상태를 변경하는 함수
 *
 * @function
 * @param {string|null} url - 변경할 URL (기본값: `null`, 변경하지 않음)
 * @param {string|null} title - 문서 제목 (기본값: `null`, 변경하지 않음)
 * @returns {void}
 *
 * @description
 * - URL이 `null`이 아닐 경우 `window.history.pushState`를 호출하여 브라우저 URL을 변경
 * - `title`은 현재 사용되지 않지만, 향후 확장을 위해 포함
 */
const PUSH_STATE = function(url = null, title = null) {
    if (url !== null) {
        window.history.pushState({}, title, url);
    }
};

export { PUSH_STATE };