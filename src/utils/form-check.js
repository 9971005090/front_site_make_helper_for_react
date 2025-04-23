
/**
 * rest api 데이타 등록 처리시 form 데이타의 유효성 검사 처리 유틸 파일
 * @fileoverview
 * - 특정 폼 요소(selector) 내의 입력값을 검증하여 유효성을 체크함
 * - 데이터 타입에 따라 추가적인 패턴 검증 기능 제공 (예: 이메일, 전화번호 등)
 * - 커스텀 검증 함수를 추가할 수 있음
 * - 입력값이 유효하지 않을 경우, 에러 메시지를 표시하고 스타일을 적용함
 */

import $ from "cash-dom";

/**
 * 폼 검증 함수
 * @description
 * - fileoverview 참조
 *
 * @param {string} selector - 폼 요소의 CSS 선택자
 * @param {Function} [addCheckFunc=null] - 추가적인 검증 함수를 적용할 경우 전달 (기본값: null)
 * @param {string} [classType="default"] - 클래스 스타일 지정 ('default' 또는 'error')
 * @returns {boolean} - 모든 필드가 유효하면 true, 하나라도 오류가 있으면 false 반환
 */
const formCheck = function(selector, addCheckFunc = null, classType = 'default') {
    let invalidFeedbackClass = `invalid-feedback`;
    let invalidClass = `is-invalid`;
    let validClass = `is-valid`;
    if (classType === `error`) {
        invalidFeedbackClass = `error-text`;
        invalidClass = `error`;
        validClass = ``;
    }

    /**
     * input 값중에서 허용하지 않는 값 비교 함수
     * @param {object} choiceObject - 입력 요소
     * @returns {boolean} - 허용하지 않는 값과 같으면 true/ 아니면 false
     */
    const _notParsingValueCheck = function(choiceObject) {
        return choiceObject.attr(`data-not-parsing-value`) === String.getValidValue(choiceObject.val());
    };

    /**
     * 오류 메시지를 HTML 형식으로 생성
     * @param {string} msg - 표시할 오류 메시지
     * @returns {string} - HTML 문자열
     */
    const setMessage = function(msg) {
        let result = `
            <div class="${invalidFeedbackClass}">
                ${msg}
            </div>
        `;
        if (classType === `error`) {
            result = `
                <p class="${invalidFeedbackClass}">
                    ${msg}
                </p>
            `;
        }
        return result;
    };

    /**
     * 데이터 타입에 따른 유효성 검사 (현재 기능 미구현, 필요 시 추가 구현 필요)
     * @param {string} dataType - 데이터 유형 (예: 'email', 'phone')
     * @param {string} input_value - 입력값
     * @returns {[boolean, string]} - [검증 실패 여부, 오류 메시지]
     */
    const typeColumnValidate = function(dataType, input_value) {
        let patternCheck = false;
        let alertMsg = null;
        // if (dataType === "birthday") {
        //     [patternCheck, alertMsg] = etc.validate.birthday(input_value);
        // }
        // else if (dataType === "cellPhone") {
        //     [patternCheck, alertMsg] = etc.validate.cellPhone(input_value);
        // }
        // else if (dataType === "email") {
        //     [patternCheck, alertMsg] = etc.validate.email(input_value);
        // }
        // else if (dataType === "telPhone") {
        //     [patternCheck, alertMsg] = etc.validate.telPhone(input_value);
        // }
        return [patternCheck, alertMsg];
    };

    /**
     * 입력값 변경 시 검증하여 스타일 적용
     * @returns {void}
     */
    const valueChange = function() {
        const self = $(this);
        const dataType = self.data("type");
        const input_value = self.val();
        let isValidate = false;
        if (input_value != "" && input_value != null) {
            isValidate = true;
        }
        if (dataType !== undefined) {
            if (isValidate === true) {
                let patternCheck = false;
                let alertMsg = null;
                [patternCheck, alertMsg] = typeColumnValidate(dataType, input_value);
                if (patternCheck === true) {
                    isValidate = false;
                }
            }
        }
        if (isValidate === true) {
            if (classType === `default`) {
                self.removeClass(invalidClass);
            }
            else if (classType === `error`) {
                self.parent().removeClass(invalidClass);
            }
        }
    };

    /**
     * ifCheck 요소 값 변경 시 유효성 검사 및 클래스 적용
     * @returns {void}
     */
    const ifCheckValueChange = function() {
        const self = $(this);
        const input_value = self.val();
        let isValidate = false;
        if (input_value === "" || input_value === null) {
            isValidate = true;
        }
        if (isValidate === true) {
            self.removeClass(invalidClass);
        }
    };

    let isValidate = true;
    const check = $(`${selector}`).find(".check");
    const ifCheck = $(`${selector}`).find(".ifCheck");

    check.on(`keyup`, valueChange);
    ifCheck.on(`keyup`, ifCheckValueChange);

    /**
     * .check 요소에 대한 유효성 검사 실행
     * @returns {void}
     */
    check.each(function(index, item) {
        const setValidate = function(obj, msg) {
            if (classType === `default`) {
                obj.removeClass(validClass).addClass(invalidClass);
                if (obj.parent().find(`.${invalidFeedbackClass}`).length <= 0) {
                    obj.parent().append(setMessage(msg));
                } else {
                    obj.parent().find(`.${invalidFeedbackClass}`).text(msg);
                }
            }
            else if (classType === `error`) {
                obj.parent().removeClass(validClass).addClass(invalidClass);
                if (obj.parent().find(`.${invalidFeedbackClass}`).length <= 0) {
                    obj.parent().append(setMessage(msg));
                } else {
                    obj.parent().find(`.${invalidFeedbackClass}`).text(msg);
                }
            }
        };
        let input = $(item);
        const input_name = input.attr("name");
        let input_value = _notParsingValueCheck(input) === true ? null : String.getValidValue(input.val());
        if ($(`${selector}`).find(`[name="${input_name}"]`).attr(`type`) === `radio` || $(`${selector}`).find(`[name="${input_name}"]`).attr(`type`) === `checkbox`) {
            input_value = null;
            if ($(`${selector}`).find(`[name="${input_name}"]:checked`).val() !== undefined) {
                input_value = _notParsingValueCheck($(`${selector}`).find(`[name="${input_name}"]:checked`)) === true ? null : String.getValidValue($(`${selector}`).find(`[name="${input_name}"]:checked`).val());
            }
            input =  $(`${selector}`).find(`[name="${input_name}"]`).eq(0);
        }
        if (String.isNullOrWhitespace(input_value) === true) {
            isValidate = false;
            setValidate(input, "필수입력 항목 입니다.");
        }
        else {
            input.removeClass(invalidClass);
            let dataType = input.data("type");
            let patternCheck = false;
            let alertMsg = null;
            if (dataType !== undefined) {
                [patternCheck, alertMsg] = typeColumnValidate(dataType, input_value);
                if (patternCheck === true) {
                    isValidate = false;
                    setValidate(input, alertMsg);
                }
            }
        }
    });

    /**
     * .ifCheck 요소에 대한 유효성 검사 실행
     * @returns {void}
     */
    ifCheck.each(function(index, item) {
        const setValidate = function(obj, msg) {
            if (classType === `default`) {
                obj.removeClass(validClass).addClass(invalidClass);
                if (obj.parent().find(`.${invalidFeedbackClass}`).length <= 0) {
                    obj.parent().append(setMessage(msg));
                } else {
                    obj.parent().find(`.${invalidFeedbackClass}`).text(msg);
                }
            }
            else if (classType === `error`) {
                obj.parent().removeClass(validClass).addClass(invalidClass);
                if (obj.parent().find(`.${invalidFeedbackClass}`).length <= 0) {
                    obj.parent().append(setMessage(msg));
                } else {
                    obj.parent().find(`.${invalidFeedbackClass}`).text(msg);
                }
            }
        };

        const input = $(item);
        const input_value = input.val();
        if (input_value !== "" && input_value !== null) {
            let dataType = input.attr(`data-type`);
            let patternCheck = false;
            let alertMsg = null;
            if (dataType !== undefined) {
                [patternCheck, alertMsg] = typeColumnValidate(dataType, input_value);
                if (patternCheck === true) {
                    isValidate = false;
                    setValidate(input, alertMsg);
                }
            }
        }
    });

    if (addCheckFunc !== null && isValidate !== false) {
        isValidate = addCheckFunc();
    }

    return isValidate;
};

export { formCheck };