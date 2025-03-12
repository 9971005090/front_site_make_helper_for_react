import $ from "cash-dom";
import { format } from 'date-fns';

import { POST } from "../../../../../utils/axios-api";
import { Notify } from '../../../../../utils/global-utils';
import { stopBubbling } from "../../../../../utils/stop-bubbling";
// import { UTIL as ORGAN_UTIL } from "../../../../../utils/api/organ";

const event = function(passParams) {
    // $(`.btn-add`).off("click").on("click", function(e) {
    //     stopEvent(e);
    //     params.navigate(`/organ/add`);
    // });

    $(`.customAlertButtonForOk`).off(`click`).on(`click`, async function(e){
        stopBubbling(e);
        const response = await passParams.parent.callbackFunc(passParams.child.params);
        if (response.result === true) {
            passParams.close();
            Notify(`top-center`, `정상적으로 ${passParams.child.text} 됐습니다.`, `success`, {func: passParams.parent.search, params: [passParams.parent.currentPage]});
            // setTimeout(function() {
            //     passParams.parent.search(passParams.parent.currentPage);
            // }, 3000);
        }
        else {
            Notify(`top-center`, `${passParams.child.text}에 실패했습니다. 잠시 후 다시 시도하세요.`, `error`);
        }
    });

    $(`.customAlertButtonForCancel`).off(`click`).on(`click`, async function(e){
        stopBubbling(e);
        passParams.close();
    });
};

export { event };