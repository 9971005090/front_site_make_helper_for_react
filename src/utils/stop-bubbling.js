
/**
 * 이벤트 버블링과 기본 동작을 제어하는 유틸리티 파일
 * @fileoverview
 * - `stopPropagation`: 이벤트 버블링을 방지하여 이벤트가 상위 요소로 전파되지 않도록 함.
 * - `preventDefault`: 기본 동작을 방지하여 기본 동작을 막을 수 있음.
 */

/**
 * 이벤트 버블링을 막거나 기본 동작을 방지하는 함수
 * @description
 * - fileoverview 참조
 *
 * @param {Event} event - 이벤트 객체
 * @param {string} [type="both"] - 제어할 동작의 유형 ('event', 'base', 'both')
 *      - 'both': 이벤트 버블링과 기본 동작을 모두 방지
 *      - 'base': 기본 동작만 방지
 *      - 'event': 이벤트 버블링만 방지
 * @returns {void}
 */
const stopBubbling = function(event, type = `both`) { // type, event/base/both
    if (event) {
        if (type === `both`) {
            event.stopPropagation(); // 이벤트 버블링 방지
            event.preventDefault(); // 기본 동작 방지 (선택 사항)
        }
        else if (type === `base`) {
            event.preventDefault(); // 기본 동작 방지 (선택 사항)
        }
        else if (type === `event`) {
            event.stopPropagation(); // 이벤트 버블링 방지
        }
    }
};

export { stopBubbling };
