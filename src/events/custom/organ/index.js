import $ from "cash-dom";
import { format } from 'date-fns';
import { stopBubbling } from "../../../utils/stop-bubbling";
import { POST } from "../../../utils/axios-api";
import { Notify } from '../../../utils/global-utils';
import { DELETE_ALERT } from "../../../utils/api/common/delete-alert";
import { CustomAlert } from '../../../components/modules/custom-alert/index';

const event = {
    'index': function(params) {
        $(`.btn-add`).off("click").on("click", function(e) {
            stopBubbling(e);
            params.navigate(`/organ/add`);
        });

        $(`.form-common-search-button`).off(`click`).on('click', function(e){
            stopBubbling(e);
            if (params.fetchDataState.current === `ready`) {
                $(`.form-common-search`)[0].dispatchEvent(new Event("submit", { bubbles: false, cancelable: false }));
            }
            else {
                Notify(`top-center`, `데이타 조회중입니다. 잠시만 기다리세요`, `info`);
            }
        });

        $(`.form-common-search`).off(`submit`).on(`submit`, async function (e) {
            stopBubbling(e);
            params.search(1);
            return;
        });

        $(`#listAllCheck`).off("click").on("click", function(e) {
            stopBubbling(e);
            if($(`#listAllCheck`).is(":checked") === true) {
                $(`#contents-by-data-table .input[type="checkbox"]`).prop("checked", true);
            }
            else {
                $(`#contents-by-data-table .input[type="checkbox"]`).prop("checked", false);
            }
        });

        $(".btn-all-delete").off("click").on("click", async function (e) {
            stopBubbling(e);
            const _t = {
                'params': {
                    'organizationCodeList': [],
                    'expiration': 1
                },
                'text': `비활성화`,
                'title': `정말 비활성화 하시겠습니까?`,
                'callback': {
                    'ok': function() {
                        $(`#listAllCheck`).prop("checked", false);
                    }
                }
            };
            $("#contents-by-data-table").find(".input[type='checkbox']").each(function (index , items) {
                if($(items).is(":checked")){
                    _t.params.organizationCodeList.push($(items).parents(".cm-tr").attr(`data-code`));
                }
            });
            if(Number($(`.radio-input[name="expiration"]:checked`).val()) === 1){
                _t.params.expiration = 0;
                _t.text = `활성화`;
                _t.title = `정말 활성화 하시겠습니까?`;
            }
            if (_t.params.organizationCodeList.length > 0) {
                // const response = await POST(`/Manager/UpdateOrganizationExpirationList`, _t.params, {});
                // if (response.result === true) {
                //     params.search(params.currentPage);
                //     $(`#listAllCheck`).prop("checked", false);
                // }
                // else {
                //     Notify(`top-center`, `데이타 업데이트 실패!`, `error`);
                // }
                const passParams = {
                    parent: params,
                    child: _t
                };
                CustomAlert.open(passParams);
            }
            else {
                Notify(`top-center`, `${_t.text} 하려는 데이타를 선택하세요!`, `error`);
            }
        });
    },
    'datas': function(params) {
        // 버튼 이름 바꾸기
        if(Number($(`.radio-input[name="expiration"]:checked`).val()) === 0){
            $(`.btn-delete`).text(`비활성화`).removeClass(`btn-restore`);
            $(`.btn-all-delete`).text(`선택 비활성화`).removeClass(`btn-all-restore`);
        } else{
            $(`.btn-delete`).text(`활성화`).addClass(`btn-restore`);
            $(`.btn-all-delete`).text(`선택 활성화`).addClass(`btn-all-restore`);
        }

        $(`.btn-delete`).off(`click`).on(`click`, async function (e) {
            stopBubbling(e);
            const _t = {
                'params': {
                    'organizationCodeList': [],
                    'expiration': 1
                },
                'text': `비활성화`,
                'title': `정말 비활성화 하시겠습니까?`
            };
            _t.params.organizationCodeList.push($(this).parents('.cm-tr').attr('data-code'));
            if (Number($(`.radio-input[name="expiration"]:checked`).val()) === 1) {
                _t.params.expiration = 0;
                _t.text = `활성화`;
                _t.title = `정말 활성화 하시겠습니까?`;
            }
            const passParams = {
                parent: params,
                child: _t
            };
            CustomAlert.open(passParams);

            // // ORGAN_UTIL.DELETE_ALERT(ORGAN_UTIL.UPDATE_EXPIRATION_LIST, parameter, _search, null, null, text);
            // const response = await POST(`/Manager/UpdateOrganizationExpirationList`, parameter, {});
            // if (response.result === true) {
            //     params.search(params.currentPage);
            // }
            // else {
            //     Notify(`top-center`, `데이타 업데이트 실패`, `error`);
            // }
        });
    }
};

export { event };