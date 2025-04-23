
/**
 * 검색 폼 데이터를 파싱하여 객체 형태로 변환하는 유틸리티 파일
 * @fileoverview
 * - 지정된 `selector` 내에서 `useColumnSelector` 클래스를 가진 요소만을 대상으로 함.
 * - `radio` 및 `checkbox` 타입의 입력값도 올바르게 처리.
 * - 특정 값이 `data-not-parsing-value` 속성과 일치할 경우 null로 변환.
 */

import $ from "cash-dom";

/**
 * 검색 폼 데이터를 파싱하여 객체로 반환하는 함수
 * @description
 * - fileoverview 참조
 * *
 * @param {string} selector - 검색 폼을 감싸는 최상위 요소의 선택자
 * @param {string} [useColumnSelector=".use-option"] - 검색 필드로 사용할 요소의 선택자 (기본값: `.use-option`)
 * @returns {Object} - 폼 필드의 name 속성을 키로 하고, 해당 값을 가진 객체 반환
 */
const formSearchParser = function(selector, useColumnSelector = `.use-option`) {
    const _notParsingValueCheck = function(choiceObject) {
        return choiceObject.attr(`data-not-parsing-value`) === String.getValidValue(choiceObject.val());
    };
    const form = {};

    $(selector)
        .find(useColumnSelector)
        .each(function (i) {
            const name = $(this).attr(`name`);

            form[name] = _notParsingValueCheck($(selector).find(`[name="${name}"]`)) === true ? null : String.getValidValue($(selector).find(`[name="${name}"]`).val());
            if ($(selector).find(`[name="${name}"]`).attr(`type`) === `radio` || $(selector).find(`[name="${name}"]`).attr(`type`) === `checkbox`) {
                form[name] = _notParsingValueCheck($(selector).find(`[name="${name}"]:checked`)) === true ? null : String.getValidValue($(selector).find(`[name="${name}"]:checked`).val());
            }
        });

    return form;
};

export { formSearchParser };
