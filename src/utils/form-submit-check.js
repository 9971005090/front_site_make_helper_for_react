// src/utils/form-submit-check.js
import $ from "cash-dom";
import { Notify } from '../utils/global-utils';

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