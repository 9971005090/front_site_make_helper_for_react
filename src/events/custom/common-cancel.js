// src/events/custom/common-cancel.js

import React from "react";
import $ from "cash-dom";
import { CustomAlertAsync } from '../../components/modules/custom-alert-async/index';
import { nl2br } from "../../helpers/text";

const event = function(params) {
    $(`.btn-go-list`).off(`click`).on(`click`, function(){
        const okBtnCallback = function () {
            params.navigate(`/${params.controllerName}/index`, { state: { back: location.pathname } });
            CustomAlertAsync.close();
        };
        CustomAlertAsync.open({
            msg: function() {
                return (<span>{nl2br(`목록 화면으로 이동하시겠습니까?\n입력 하신 내용은 모두 삭제됩니다.`)}</span>);
            },
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
};

export { event };