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
        $(`.btn-add`).off(`click`).on(`click`, function(e) {
            stopBubbling(e);
            params.navigate(`/device/add`, { state: { back: location.pathname } });
        });

        $(`.btn-add-for-bulk`).off(`click`).on(`click`, function() {
            params.navigate(`/device/add-bulk`, { state: { back: location.pathname } });
        });

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

        $(`#listAllCheck`).off(`click`).on(`click`, function(e) {
            if ($(`#listAllCheck`).is(`:checked`) === true) {
                $(`#contents-by-data-table .input[type="checkbox"]`).prop("checked", true);
            }
            else {
                $(`#contents-by-data-table .input[type="checkbox"]`).prop("checked", false);
            }
        });
        // search: search, fetchDataState: fetchDataState.current, navigate: navigate, currentPage: currentPage.current}

        $(`.btn-all-delete`).off(`click`).on(`click`, async function(e) {
            stopBubbling(e);
            const parameter = {
                buttonTitle: `삭제`,
                params: {
                    'targetOrganizationCode': $(`#select-box-for-organ .select-item`).val(),
                    'serialNumberList': []
                },
                title: `정말 삭제 하시겠습니까?`
            };
            $("#contents-by-data-table").find(`.input[type="checkbox"]`).each(function(index , items) {
                if ($(items).is(`:checked`)) {
                    parameter.params.serialNumberList.push($(items).parents(`.cm-tr`).attr(`data-serial-number`));
                }
            });

            // custom-alert 종료는 해당 모듈에서 추가로 주입하는것으로
            const okBtnCallback = async function() {
                const response = await DEVICE_UTIL.DELETE_ALL(parameter.params);
                if (response.result === true) {
                    Notify(`top-center`, `정상적으로 ${parameter.buttonTitle}됐습니다.`, `success`);
                    $(`#listAllCheck`).prop("checked", false);
                }
                else {
                    Notify(`top-center`, `${parameter.buttonTitle}에 실패했습니다. 잠시 후 다시 시도하세요.`, `error`);
                }
                params.search(params.currentPage);
                CustomAlertAsync.close();
            };
            if (parameter.params.serialNumberList.length > 0) {
                const MsgComponent = function() {
                    return (
                        <p className="customAlertText">{`정말 ${parameter.buttonTitle} 하시겠습니까?`}</p>
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
            }
            else {
                Notify(`top-center`, `${parameter.buttonTitle} 하려는 데이타를 선택하세요!`, `error`);
            }
        });
        
        $(`.btn-move-for-choice`).off(`click`).on(`click`, function(e) {
            stopBubbling(e);
            const parameter = {
                'targetOrganizationCode': null,
                'wardCode': null,
                'serialNumberList': []
            };
            $("#contents-by-data-table").find(`.input[type='checkbox']`).each(function (index , items) {
                if($(items).is(`:checked`) === true) {
                    parameter.serialNumberList.push($(items).parents(`.cm-tr`).attr(`data-serial-number`));
                }
            });
            if (parameter.serialNumberList.length <= 0) {
                Notify(`top-center`, `이동하려는 디바이스를 선택하세요!`, `error`);
                return;
            }

            // custom-alert 종료는 해당 모듈에서 추가로 주입하는것으로
            const okBtnCallback = async function() {
                console.log("$(`.select-box-parent-for-organ-on-move`).find(`.select-item`).val()::::", $(`.select-box-parent-for-organ-on-move`).find(`.select-item`).val());
                console.log("$(`.select-box-parent-for-ward-on-move`).find(`.select-item`).val()::::", $(`.select-box-parent-for-ward-on-move`).find(`.select-item`).val());
                if (String.isNullOrWhitespace($(`.select-box-parent-for-organ-on-move`).find(`.select-item`).val()) === true || $(`.select-box-parent-for-organ-on-move`).find(`.select-item`).val() === `all`) {
                    Notify(`top-center`, `이동하려는 기관을 선택하세요!`, `error`);
                    return false;
                }
                if (String.isNullOrWhitespace($(`.select-box-parent-for-ward-on-move`).find(`.select-item`).val()) === true || $(`.select-box-parent-for-ward-on-move`).find(`.select-item`).val() === `all`) {
                    Notify(`top-center`, `이동하려는 기관의 병동을 선택하세요!`, `error`);
                    return false;
                }
                parameter.targetOrganizationCode = $(`.select-box-parent-for-organ-on-move .select-item`).val();
                parameter.wardCode = $(`.select-box-parent-for-ward-on-move .select-item`).val();
                const _r = await DEVICE_UTIL.UPDATE_ALL(parameter);
                if (_r.result === true) {
                    Notify(`top-center`, `정상적으로 이동왰습니다.`, `success`);
                    $(`#listAllCheck`).prop("checked", false);
                }
                else {
                    Notify(`top-center`, `이동에 실패했습니다. 잠시 후 다시 시도하세요.`, `error`);
                }

                params.search(params.currentPage);
                CustomAlertAsync.close();
            };
            const cancelBtnCallback = async function() {
                window.CONSTANTS.get(`DEVICE.PAGE.CUSTOM_SELECT_BOX_ORGAN.RESULT`).close();
                window.CONSTANTS.get(`DEVICE.PAGE.CUSTOM_SELECT_BOX_WARD.RESULT`).close();
            };
            if (parameter.serialNumberList.length > 0) {
                const callbackForCustomSelectBoxOrgan = async function(choiceBox) {
                    const choiceCode = choiceBox.attr(`data-code`);
                    let _d = [];
                    if (choiceCode !== null && choiceCode !== `all`) {
                        _d = await WARD_UTIL.LIST_FOR_PARSING({'organizationCode': choiceCode});
                    }
                    params.etc.current.wardOptions.datas = _d;
                    await params.cBox.ward.run(`.select-box-parent-for-ward-on-move`, params.etc.current.wardOptions, window.CONSTANTS.get(`DEVICE.PAGE.CUSTOM_SELECT_BOX_WARD_MOVE.RESULT`));
                };

                const postProcessForOpen = async function () {
                    params.etc.current.organOptions.callback = callbackForCustomSelectBoxOrgan;
                    const _o = await params.cBox.organ.run(`.select-box-parent-for-organ-on-move`, params.etc.current.organOptions);
                    const _w = await params.cBox.ward.run(`.select-box-parent-for-ward-on-move`, params.etc.current.wardOptions);
                    window.CONSTANTS.set(`DEVICE.PAGE.CUSTOM_SELECT_BOX_WARD_MOVE.RESULT`, _w, true);
                };

                const MsgComponent = function() {
                    return (
                        <div style={{ display: "flex", gap: "5px" }}>
                            <div className="select-box-parent-for-organ-on-move"></div>
                            <div className="select-box-parent-for-ward-on-move"></div>
                        </div>
                    );
                };
                CustomAlertAsync.open({
                    // msg: `정말 ${parameter.buttonTitle} 하시겠습니까?`,
                    msg: MsgComponent,
                    isBackgroundClickForClose: false,
                    button: {
                        ok : {
                            callback :[{ name: okBtnCallback, params: [] }]
                        },
                        cancel : {
                            callback :[{ name: cancelBtnCallback, params: [] }]
                        },
                        del: {
                            isUse: false
                        }
                    },

                    eventCallback: [{
                        name: postProcessForOpen,
                        params: []
                    }]
                });
            }
            else {
                Notify(`top-center`, `${parameter.buttonTitle} 하려는 데이타를 선택하세요!`, `error`);
            }
        });
    },
};

export { event };