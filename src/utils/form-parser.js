
/**
 * HTML 폼 데이터를 객체 형태로 파싱하는 유틸리티 파일
 * @fileoverview
 * - 입력 필드(input, select, textarea)의 name 속성을 기반으로 값을 추출하여 객체로 반환.
 * - 라디오 버튼과 체크박스의 경우 선택된 값만 포함됨.
 */

import $ from "cash-dom";

/**
 * 폼 데이터를 객체로 변환하는 함수
 * @description
 * - fileoverview 참조
 *
 * @param {string} formSelector - 폼 요소를 선택할 수 있는 CSS 셀렉터
 * @returns {Object} 폼 필드의 name 속성을 키로 하고, 해당 값을 가진 객체 반환
 */
const formParser = function(formSelector) {
    const form = {};

    $(`${formSelector}`)
        .find("input, select, textarea")
        .each(function() {
            const name = $(this).attr("name");
            if (!name) return; // name 속성이 없는 경우 건너뜀

            form[name] = String.getValidValue($(this).val());
            if ($(this).attr("type") === "radio" || $(this).attr("type") === "checkbox") {
                form[name] = $(`${formSelector}`).find(`[name="${name}"]:checked`).val() || null;
            }
        });

    return form;
};

export { formParser };
