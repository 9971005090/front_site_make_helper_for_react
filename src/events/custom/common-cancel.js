// src/events/custom/organ/add.js
import $ from "cash-dom";

import { UTIL as ORGAN_UTIL } from "../../utils/api/organ";
import { Notify } from '../../utils/global-utils';
import { formParser } from "../../utils/form-parser";
import { formCheck } from "../../utils/form-check";
import { stopBubbling } from "../../utils/stop-bubbling";
import { isFormSubmit } from "../../utils/form-submit-check";
import { CustomAlert } from '../../components/modules/custom-alert/index';

const event = function(params) {
    $(".btn-go-list").off("click").on("click", function(){
        let modalId = "customAlert";
        const okBtnCallback = function (param) {
            etc.move(`/${menuName}/index`);
            modal.globalClose(param);
        }
        const cancelBtnCallback = function (param) {
            modal.globalClose(param);
        }
        let msg = ``;
        if(GBL.CONSTANTS.get(`NOW_ACTION`).indexOf(`add`) !== -1) {
            msg =`등록을 멈추고 목록 화면으로 이동하시겠습니까?<br>입력 하신 내용은 모두 삭제됩니다.`;
        }
        else if(GBL.CONSTANTS.get(`NOW_ACTION`) === "update") {
            msg =`정보 수정을 멈추고 목록 화면으로 이동하시겠습니까?<br>수정된 내용은 모두 삭제됩니다.`;
        }
        else if(GBL.CONSTANTS.get(`NOW_ACTION`) === "dynamic") {
            msg =`목록 화면으로 이동하시겠습니까?<br>입력 하신 내용은 모두 삭제됩니다.`;
        }
        let initParameter = {
            msg: `<p class="customAlertText">${msg}</p>`,
            id: modalId,
            isBackgroundClickForClose: false,
            button: {
                cancel: {
                    isUse: true,
                    callback: [{name: cancelBtnCallback, params: [modalId]}]
                },
                ok: {
                    callback: [{
                        name: okBtnCallback, params: [modalId]
                    }]
                },
                del: {
                    isUse: false
                }
            }
        }
        Seers.Loader.moduleLoad("custom-alert", "index", initParameter);
    });


    $(`.btn-confirm`).off(`click`).on(`click`, async function(e) {
        stopBubbling(e);
        CustomAlert.open({
            callbackFunc: {
                name: params.callbackFunc.multiUpdate.name,
                params: params.callbackFunc.multiUpdate.params,
                message: {
                    ok: params.callbackFunc.multiUpdate.ok,
                    fail: params.callbackFunc.multiUpdate.fail
                }
            },
            afterCallbackFunc: {
                ok: [
                    {
                        name: params.callbackFunc.search.name,
                        params: [params.currentPage]
                    },
                    {
                        name: function() {
                            $(`#listAllCheck`).prop("checked", false);
                        },
                        params: []
                    },
                ]
            },
            title: `목록 화면으로 이동하시겠습니까?<br>입력 하신 내용은 모두 삭제됩니다.`,
        });
    });




    // $(`.btn-go-list`).off(`click`).on(`click`, function() {
    //     let modalId = "customAlert";
    //     const okBtnCallback = function (param) {
    //         etc.move(`/${menuName}/index`);
    //         modal.globalClose(param);
    //     }
    //     const cancelBtnCallback = function (param) {
    //         modal.globalClose(param);
    //     }
    //     let msg = ``;
    //     if(GBL.CONSTANTS.get(`NOW_ACTION`).indexOf(`add`) !== -1) {
    //         msg =`등록을 멈추고 목록 화면으로 이동하시겠습니까?<br>입력 하신 내용은 모두 삭제됩니다.`;
    //     }
    //     else if(GBL.CONSTANTS.get(`NOW_ACTION`) === "update") {
    //         msg =`정보 수정을 멈추고 목록 화면으로 이동하시겠습니까?<br>수정된 내용은 모두 삭제됩니다.`;
    //     }
    //     else if(GBL.CONSTANTS.get(`NOW_ACTION`) === "dynamic") {
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