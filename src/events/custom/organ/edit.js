// src/events/custom/organ/edit.js
import $ from "cash-dom";

import { UTIL as ORGAN_UTIL } from "../../../utils/api/organ";
import { Notify } from '../../../utils/global-utils';
import { formParser } from "../../../utils/form-parser";
import { formCheck } from "../../../utils/form-check";
import { stopBubbling } from "../../../utils/stop-bubbling";
import { isFormSubmit } from "../../../utils/form-submit-check";

const event = function(params) {
    const _checkInsertInfo = async function(param = null) {
        if (param === null) {
            return false;
        }
        let msg = ``;
        const _checkValidCode = await ORGAN_UTIL.SELECT(param.organizationCode);
        const emailCheck = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if (String.isNullOrWhitespace(param.systemManager) === false) {
            if (param.systemManager.match(emailCheck) === null) {
                msg = `이메일을 확인해주세요.`;
            }
        }
        if (msg === ``) {
            return true;
        }
        else {
            Notify(`top-center`, msg, `error`);
            isFormSubmit(`#form-data`, `end`);
            return false;
        }
    };


    $(`.btn-confirm`).off(`click`).on(`click`, async function(e) {
        stopBubbling(e);
        const dataFormId = `#form-data`;
        const form = formParser(dataFormId);
        if (formCheck(dataFormId, null, `error`) === true) {
            if (isFormSubmit(dataFormId, `check`) === true) {
                return false;
            }
            if (await _checkInsertInfo(form) === true) {
                const _t = await ORGAN_UTIL.UPDATE(form);
                isFormSubmit(`#form-data`, `end`);
                if (_t.result === true) {
                    Notify(`top-center`, `수정이 완료됐습니다.`, `success`);
                    setTimeout(function() {
                        params.navigate(`/organ/index`, { state: { back: location.pathname } });
                    }, 3000);
                }
                else {
                    Notify(`top-center`, `수정에 실패하였습니다.`, `error`);
                    isFormSubmit(`#form-data`, `end`);
                }
            }

        }
    });
};

export { event };