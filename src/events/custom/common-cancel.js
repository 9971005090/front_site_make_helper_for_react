// src/events/custom/organ/add.js

import $ from "cash-dom";
import { CustomAlertAsync } from '../../components/modules/custom-alert-async/index';

const event = function(params) {
    $(`.btn-go-list`).off(`click`).on(`click`, function(){
        const okBtnCallback = function () {
            params.navigate(`/${params.controllerName}/index`, { state: { back: location.pathname } });
        };
        CustomAlertAsync.open({
            msg: `목록 화면으로 이동하시겠습니까?\n입력 하신 내용은 모두 삭제됩니다.`,
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