// src/utils/api/organ.js
import { API } from "../../../constants/api/organ";
import { POST } from "../../../utils/axios-api";
// import addParams from "../custom/addParams";

export const DELETE_ALERT = function(callbackFunction= null, param=null) {
    // const okBtnCallback = function () {
    //     const response = callbackFunction(param);
    //     if (response.result === true) {
    //         custom.etc.customToastForColor(`정상적으로 ${text}됐습니다.`);
    //     }
    //     else {
    //         custom.etc.customToastForColor(`${text}에 실패했습니다. 잠시 후 다시 시도하세요.`, `bgRed`);
    //     }
    //     modal.globalClose(modalId);
    //     callbackFunctionSearch(search, pathName);
    // }
    //
    // const cancelBtnCallback = function () {
    //     modal.globalClose(modalId);
    // }
    // let initParameter = {
    //     msg: `<p class="customAlertText">정말 ${text} 하시겠습니까?</p>`,
    //     id: modalId,
    //     isBackgroundClickForClose: false,
    //     button: {
    //         cancel: {
    //             callback :[{ name: cancelBtnCallback, params: [] }]
    //         },
    //         ok : {
    //             callback :[{ name: okBtnCallback, params: [] }]
    //         },
    //         del: {
    //             isUse: false
    //         }
    //     }
    // }
};
