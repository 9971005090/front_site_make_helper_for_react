// src/utils/formCheck.js
import $ from "cash-dom";

const formCheck = function(selector, addCheckFunc = null, classType = 'default') {
    let invalidFeedbackClass = `invalid-feedback`;
    let invalidClass = `is-invalid`;
    let validClass = `is-valid`;
    if (classType === `error`) {
        invalidFeedbackClass = `error-text`;
        invalidClass = `error`;
        validClass = ``;
    }

    const _notParsingValueCheck = function(choiceObject) {
        return choiceObject.attr(`data-not-parsing-value`) === String.getValidValue(choiceObject.val());
    };

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

    check.on("keyup", valueChange);
    ifCheck.on("keyup", ifCheckValueChange);

    check.each(function(index, item) {
        console.log("item::::", item);
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