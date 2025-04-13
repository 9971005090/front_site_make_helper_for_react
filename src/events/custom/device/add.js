// src/events/custom/organ/add.js
import $ from "cash-dom";

import { UTIL as DEVICE_UTIL } from "../../../utils/api/custom/device/index";
import { UTIL as DEVICE_CHECK_UTIL } from "../../../utils/api/custom/device/check";
import { Notify } from '../../../utils/global-utils';
import { formParser } from "../../../utils/form-parser";
import { formCheck } from "../../../utils/form-check";
import { stopBubbling } from "../../../utils/stop-bubbling";
import { isFormSubmit } from "../../../utils/form-submit-check";

const event = function(params) {
    $(`.btn-confirm`).off(`click`).on(`click`, async function(e) {
        stopBubbling(e);
        let _serialCheckResult = null;
        const _validCheckForSerialNumber = function() {
            _serialCheckResult = DEVICE_CHECK_UTIL.SERIAL(form['serialNumber']);
            if (_serialCheckResult.result === false) {
                Notify(`top-center`, _serialCheckResult.msg, `error`);
            }
            return _serialCheckResult.result;
        };
        let dataFormId = "#form-data";
        let form = formParser(dataFormId);
        if(formCheck(dataFormId, _validCheckForSerialNumber, `error`) === true) {
            if(isFormSubmit(dataFormId, "check") === true) {
                return false;
            }
            const _params = {
                "targetOrganizationCode": form[`targetOrganizationCode`],
                "deviceCode": form[`deviceCode`],
                "wardCode": form[`wardCode`],
                "serialNumber": form[`serialNumber`],
                "deviceType": _serialCheckResult.deviceType,
                "macAddress": _serialCheckResult.macAddress,
                "etc" : form[`etc`],
            };
            if (await DEVICE_CHECK_UTIL.DUPLICATE(_params) === true) {
                const _t = await DEVICE_UTIL.INSERT(_params);
                if (_t.result === true) {
                    Notify(`top-center`, `등록이 완료됐습니다.`, `success`);
                    setTimeout(function() {
                        params.navigate(`/device/index`, { state: { back: location.pathname } });
                    }, 3000);
                }
                else {
                    Notify(`top-center`, `등록에 실패하였습니다.`, `error`);
                    isFormSubmit(`#form-data`, `end`);
                }
            }
            else {
                isFormSubmit(`#form-data`, `end`);
            }
        }
    });
};

export { event };