// src/events/custom/organ/index.js
import $ from "cash-dom";
import { stopBubbling } from "../../../utils/stop-bubbling";
import { Notify } from '../../../utils/global-utils';
import { CustomAlertAsync } from '../../../components/modules/custom-alert-async/index';
import { UTIL as ORGAN_UTIL } from "../../../utils/api/organ";

const event = {
    'index': function(params) {
        $(`.btn-add`).off(`click`).on(`click`, function(e) {
            stopBubbling(e);
            params.navigate(`/organ/add`);
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
            stopBubbling(e);
            if ($(`#listAllCheck`).is(":checked") === true) {
                $(`#contents-by-data-table .input[type="checkbox"]`).prop("checked", true);
            }
            else {
                $(`#contents-by-data-table .input[type="checkbox"]`).prop("checked", false);
            }
        });
        // search: search, fetchDataState: fetchDataState.current, navigate: navigate, currentPage: currentPage.current}

        $(".btn-all-delete").off(`click`).on(`click`, async function(e) {
            stopBubbling(e);
            const update = {
                buttonTitle: `비활성화`,
                params: {
                    'organizationCodeList': [],
                    'expiration': 1
                },
                title: `정말 활성화 하시겠습니까?`
            };
            $("#contents-by-data-table").find(".input[type='checkbox']").each(function(index , items) {
                if ($(items).is(":checked")) {
                    update.params.organizationCodeList.push($(items).parents(".cm-tr").attr(`data-code`));
                }
            });
            if (Number($(`.radio-input[name="expiration"]:checked`).val()) === 1) {
                update.buttonTitle = `활성화`;
                update.params.expiration = 0;
                update.title = `정말 활성화 하시겠습니까?`;
            }

            // custom-alert 종료는 해당 모듈에서 추가로 주입하는것으로
            const okBtnCallback = async function() {
                const response = await ORGAN_UTIL.UPDATE_EXPIRATION_LIST(update.params);
                if (response.result === true) {
                    Notify(`top-center`, `정상적으로 ${update.buttonTitle}됐습니다.`, `success`);
                }
                else {
                    Notify(`top-center`, `${update.buttonTitle}에 실패했습니다. 잠시 후 다시 시도하세요.`, `error`);
                }
                params.search(params.currentPage);
            };
            if (update.params.organizationCodeList.length > 0) {
                CustomAlertAsync.open({
                    msg: `정말 ${update.buttonTitle} 하시겠습니까?`,
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
                Notify(`top-center`, `${update.buttonTitle} 하려는 데이타를 선택하세요!`, `error`);
            }
        });
    },
};

export { event };