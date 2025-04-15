// src/events/custom/organ/add.js
import $ from "cash-dom";

import { UTIL as DEVICE_UTIL } from "../../../utils/api/custom/device/index";
import { UTIL as DEVICE_CHECK_UTIL } from "../../../utils/api/custom/device/check";
import { Notify } from '../../../utils/global-utils';
import { RUN as EXCEL_IMPORT_RUN } from "../../../utils/excel-import";
import { formParser } from "../../../utils/form-parser";
import { formCheck } from "../../../utils/form-check";
import { stopBubbling } from "../../../utils/stop-bubbling";
import { isFormSubmit } from "../../../utils/form-submit-check";
import ReactDOM from "react-dom/client";
import React from "react";


const event = function(params) {
    const _AddComponent = function(serialCheckResult, parentSelector) {
        const Com = function({ info }) {
            React.useEffect(function() {
                $(`.device-bulk-del-btn.${info.serialNumber}`).off(`click`).on(`click`, function (e) {
                    stopBubbling(e);
                    close();
                });
            }, []);
            return (
                <>
                    <span className="device-bulk-serial-number">{info.serialNumber}</span>
                    <div className={`device-bulk-del-btn ${info.serialNumber}`}><span className="img"></span></div>
                </>
            );
        };
        const close = function() {
            if (root !== null) {
                root.unmount();
            }
            if (container !== null) {
                container.remove();
            }
        };
        const container = $(`<div>`).attr(`class`, `device-bulk-info-list`).attr(`data-serial-number`, serialCheckResult.serialNumber).attr(`data-device-type`, serialCheckResult.deviceType).attr(`data-mac-address`, serialCheckResult.macAddress).attr(`data-device-code`, null);
        const root = ReactDOM.createRoot(container[0]);
        root.render(
            <Com info={serialCheckResult} />
        );
        $(parentSelector).append(container[0]);
    };
    const _serialBulkAdd = async function(serialNumber, selector = `.device-bulk-serial-number-text`, parentSelector = `.device-bulk-info-parent`) {
        const _serialCheckResult = DEVICE_CHECK_UTIL.SERIAL(serialNumber);
        if (_serialCheckResult.result === false) {
            Notify(`top-center`, _serialCheckResult.msg, `error`);
        }
        else {
            if (await DEVICE_CHECK_UTIL.DUPLICATE(_serialCheckResult) === true) {
                _AddComponent(_serialCheckResult, parentSelector);
                $(selector).val(``);
            }
        }
        $(selector)[0].focus();
    };
    $(`.form-data-table`).off(`submit`).on(`submit`, function (e) {
        stopBubbling(e);
        return false;
    });
    $(`.device-bulk-serial-number-text`).off(`keyup`).on(`keyup`, function (e) {
        stopBubbling(e);
        if(e.keyCode === 13) {
            _serialBulkAdd($(`.device-bulk-serial-number-text`).val());
        }
        else {
            return false;
        }
    });
    $(`.device-bulk-serial-number-add-button`).off(`click`).on(`click`, function (e) {
        stopBubbling(e);
        _serialBulkAdd($(`.device-bulk-serial-number-text`).val());
    });
    $(`.device-bulk-excel-add-button`).off(`click`).on(`click`, function (e) {
        stopBubbling(e);
        $('#excel-file-upload').trigger(`click`);
    });
    $('#excel-file-upload').off(`change`).on(`change`, async function (e) {
        const file = e.target.files[0];
        if (File.whatIsFileType(file) !== `excel`) {
            Notify(`top-center`, `엑셀 파일이 아닙니다.(2007이후 버전만 허용)`, `error`);
            return;
        }
        else {
            $(`.device-bulk-excel-add-button`).find(`span`).text(`처리중....`);
            EXCEL_IMPORT_RUN(file, function(datas) {
                for (let i = 0; i < datas.length; i++) {
                    _serialBulkAdd(datas[i][0]);
                }
                $(`.device-bulk-excel-add-button`).find(`span`).text(`엑셀파일`);
            });
        }
    });
    $(`.btn-confirm`).off(`click`).on(`click`, async function (e) {
        stopBubbling(e);
        let _serialCheckResult = null;
        const _validCheckForSerialNumber = function() {
            if ($(`.device-bulk-info-list`).length <= 0) {
                Notify(`top-center`, `시리얼번호를 입력하세요!`, `error`);
                isFormSubmit("form-data", "end");
                return false;
            }
            else {
                return true;
            }
            return _serialCheckResult.result;
        };
        let dataFormSelector = "#form-data";
        let form = formParser(dataFormSelector);
        if(formCheck(dataFormSelector, _validCheckForSerialNumber, `error`) === true) {
            if(isFormSubmit(dataFormSelector, "check") === true) {
                return false;
            }
            let _l = new Array();
            $(`.device-bulk-info-list`).each(function(index, item) {
                _l.push({
                    "deviceCode": String.isNullOrWhitespace($(item).attr(`data-device-code`)) === true ? null : $(item).attr(`data-device-code`),
                    "serialNumber": $(item).attr(`data-serial-number`),
                    "deviceType": $(item).attr(`data-device-type`),
                    "macAddress": $(item).attr(`data-mac-address`)
                });
            });
            const passParams = {
                "targetOrganizationCode": form[`targetOrganizationCode`],
                "wardCode": form[`wardCode`],
                "deviceInfoList": _l,
            };
            const _t = await DEVICE_UTIL.INSERT_BULK(passParams);
            if (_t.result === true) {
                Notify(`top-center`, `등록이 완료됐습니다.`, `success`);
                params.navigate(`/device/index`, { state: { back: location.pathname } });

            }
            else{
                Notify(`top-center`, `등록에 실패하였습니다.`, `error`);
                isFormSubmit("form-data", "end");
            }
        }
    });
};

export { event };