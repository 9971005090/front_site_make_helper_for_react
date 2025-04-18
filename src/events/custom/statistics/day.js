// src/events/custom/device/index.js
import React from "react";
import $ from "cash-dom";
import { stopBubbling } from "../../../utils/stop-bubbling";
import { Notify } from '../../../utils/global-utils';
import { CustomAlertAsync } from '../../../components/modules/custom-alert-async/index';
import { UTIL as DEVICE_UTIL } from "../../../utils/api/custom/device/index";
import {nl2br} from "../../../helpers/text";
import { UTIL as WARD_UTIL } from "../../../utils/api/custom/ward";

const event = {
    'index': function(params) {
        $(`.form-common-search-button`).off(`click`).on('click', function(e){
            stopBubbling(e);
            if (params.fetchDataState === `ready`) {
                $(`.form-common-search`)[0].dispatchEvent(new Event("submit", { bubbles: false, cancelable: false }));
            }
            else {
                Notify(`top-center`, `데이타 조회중입니다. 잠시만 기다리세요`, `info`);
            }
        });
        $(`.form-common-search`).off(`submit`).on(`submit`, async function(e) {
            stopBubbling(e);
            params.search(1);
            return;
        });
    },
};

export { event };