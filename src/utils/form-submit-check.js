
/**
 * 폼 제출 여부를 확인하고 중복 제출을 방지하는 유틸리티 파일
 * @fileoverview
 * - 특정 폼(`selector`) 내에 `#isFormSubmit` 요소가 존재하는지 확인하여 중복 제출 방지.
 * - `type` 값에 따라 폼 제출 상태를 확인(check)하거나 초기화(end).
 * - 중복 제출 시 알림을 표시함.
 */

import $ from "cash-dom";
import { Notify } from '../utils/global-utils';

/**
 * 폼 제출 여부를 확인하고, 중복 제출을 방지하는 함수
 * @description
 * - fileoverview 참조
 *
 * @param {string} [selector=null] - 폼을 감싸는 최상위 요소의 선택자 (null 가능)
 * @param {string} [type="check"] - "check" (제출 확인) 또는 "end" (제출 완료 후 초기화)
 * @returns {boolean} - 중복 제출이면 `true`, 새로운 제출이면 `false`
 */
const isFormSubmit = function(selector = null, type = "check") { // type: check/end
    if (selector === null) {
        return true;
    }
    if (type === "check") {
        if ($(`${selector}`).find(`#isFormSubmit`).length > 0) {
            Notify(`top-center`, `처리중입니다. 잠시만 기다려 주세요!`, `info`);
            return true;
        }
        else {
            $(`${selector}`).append(`<input type='hidden' id='isFormSubmit'>`);
            return false;
        }
    }
    else {
        if ($(`${selector}`).find(`#isFormSubmit`).length > 0) {
            $(`${selector}`).find(`#isFormSubmit`).remove();
        }
        return true;
    }
};

export { isFormSubmit };