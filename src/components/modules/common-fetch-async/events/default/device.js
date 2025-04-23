import React from "react";
import $ from "cash-dom";
import { format } from 'date-fns';
import { stopBubbling } from "../../../../../utils/stop-bubbling";
import { CustomAlertAsync } from '../../../../../components/modules/custom-alert-async/index';
import { UTIL as DEVICE_UTIL } from "../../../../../utils/api/custom/device/index";
import { Notify } from "../../../../../utils/global-utils";

const event = function(params) {

    $(`.btn-delete`).off(`click`).on(`click`, async function(e) {
        stopBubbling(e);
        const update = {
            buttonTitle: `삭제`,
            params: {
                'serialNumber': $(this).parents('.cm-tr').attr(`data-serial-number`),
            },
            title: `정말 삭제 하시겠습니까?`
        };

        // custom-alert 종료는 해당 모듈에서 추가로 주입하는것으로
        const okBtnCallback = async function() {
            const response = await DEVICE_UTIL.DELETE(update.params.serialNumber);
            if (response.result === true) {
                Notify(`top-center`, `정상적으로 ${update.buttonTitle}됐습니다.`, `success`);
            }
            else {
                Notify(`top-center`, `${update.buttonTitle}에 실패했습니다. 잠시 후 다시 시도하세요.`, `error`);
            }
            params.search(params.currentPage);
            CustomAlertAsync.close();
        };
        const MsgComponent = function() {
            return (
                <p className="customAlertText">{`정말 ${update.buttonTitle} 하시겠습니까?`}</p>
            );
        };
        CustomAlertAsync.open({
            msg: MsgComponent,
            isBackgroundClickForClose: false,
            button: {
                ok : {
                    callback :[{ name: okBtnCallback, params: [] }]
                },
                del: {
                    isUse: false
                }
            }
        });
    });

    $(`.button-update`).off(`click`).on(`click`, function(e) {
        stopBubbling(e);
        params.navigate(`/device/edit?code=${$(this).closest('.cm-tr').attr(`data-code`)}`, { state: { back: location.pathname } });
    });

    $(`#contents-by-data-table .input[type="checkbox"]`).off(`click`).on(`click`, function(e) {
        const total = $(`#contents-by-data-table .input[type="checkbox"]`).length;
        const checked = $(`#contents-by-data-table .input[type="checkbox"]:checked`).length;

        if(total !== checked) $(`#listAllCheck`).prop("checked", false);
        else $(`#listAllCheck`).prop("checked", true);
    });
};

export { event };