// src/events/custom/organ/add.js
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
        if (_checkValidCode.result === true) {
            if (String.isNullOrWhitespace(_checkValidCode.organization) === false) {
                msg = `코드가 중복됩니다. 다른 코드를 사용해주세요.`;
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
                const _t = await ORGAN_UTIL.INSERT(form);
                isFormSubmit(`#form-data`, `end`);
                if (_t.result === true) {
                    Notify(`top-center`, `등록이 완료됐습니다.`, `success`);
                    setTimeout(function() {
                        params.navigate(`/organ/index`);
                    }, 3000);
                }
                else {
                    Notify(`top-center`, `등록에 실패하였습니다.`, `error`);
                    isFormSubmit(`#form-data`, `end`);
                }
            }
        }
    });




    // $(`.btn-go-list`).off(`click`).on(`click`, function() {
    //     let modalId = "CustomAlertSync";
    //     const okBtnCallback = function (param) {
    //         etc.move(`/${menuName}/index`);
    //         modal.globalClose(param);
    //     }
    //     const cancelBtnCallback = function (param) {
    //         modal.globalClose(param);
    //     }
    //     let msg = ``;
    //     if (GBL.CONSTANTS.get(`NOW_ACTION`).indexOf(`add`) !== -1) {
    //         msg =`등록을 멈추고 목록 화면으로 이동하시겠습니까?<br>입력 하신 내용은 모두 삭제됩니다.`;
    //     }
    //     else if (GBL.CONSTANTS.get(`NOW_ACTION`) === "update") {
    //         msg =`정보 수정을 멈추고 목록 화면으로 이동하시겠습니까?<br>수정된 내용은 모두 삭제됩니다.`;
    //     }
    //     else if (GBL.CONSTANTS.get(`NOW_ACTION`) === "dynamic") {
    //         msg =`목록 화면으로 이동하시겠습니까?<br>입력 하신 내용은 모두 삭제됩니다.`;
    //     }
    //     let initParameter = {
    //         msg: `<p class="customAlertText">${msg}</p>`,
    //         id: modalId,
    //         isBackgroundClickForClose: false,
    //         button: {
    //             cancel: {
    //                 isUse: true,
    //                 callback: [{name: cancelBtnCallback, params: [modalId]}]
    //             },
    //             ok: {
    //                 callback: [{
    //                     name: okBtnCallback, params: [modalId]
    //                 }]
    //             },
    //             del: {
    //                 isUse: false
    //             }
    //         }
    //     }
    //     Seers.Loader.moduleLoad("custom-alert", "index", initParameter);
    // });
};

export { event };