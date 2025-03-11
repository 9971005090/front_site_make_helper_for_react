import $ from "cash-dom";
import stopEvent from "../../../utils/stopEvent";
import { format } from 'date-fns';
import { post } from "../../../utils/axiosApi";

const event = {
    'index': function(params) {
        $(`.btn-add`).off("click").on("click", function(e) {
            stopEvent(e);
            params.navigate(`/organ/add`);
        });

        $(`.form-common-search-button`).off(`click`).on('click', function(e){
            stopEvent(e);
            if (params.fetchDataState.current === `ready`) {
                $(`.form-common-search`)[0].dispatchEvent(new Event("submit", { bubbles: false, cancelable: false }));
            }
            else {
                alert("데이타 조회중입니다. 잠시만 기다리세요");
            }
        });

        $(`.form-common-search`).off(`submit`).on(`submit`, async function (e) {
            stopEvent(e);
            params.search(1);
            return;
        });

        $(`#listAllCheck`).off("click").on("click", function(e) {
            stopEvent(e);
            if($(`#listAllCheck`).is(":checked") === true) {
                $(`#contents-by-data-table .input[type="checkbox"]`).prop("checked", true);
            }
            else {
                $(`#contents-by-data-table .input[type="checkbox"]`).prop("checked", false);
            }
        });

        $(".btn-all-delete").off("click").on("click", async function (e) {
            stopEvent(e);
            const _t = {
                'params': {
                    'organizationCodeList': [],
                    'expiration': 1
                },
                'text': `비활성화`
            };
            $("#contents-by-data-table").find(".input[type='checkbox']").each(function (index , items) {
                if($(items).is(":checked")){
                    _t.params.organizationCodeList.push($(items).parents(".cm-tr").data("code"));
                }
            });
            if(Number($(`.radio-input[name="expiration"]:checked`).val()) !== 0){
                _t.params.expiration = 1;
                _t.text = `활성화`;
            }

            if (_t.params.organizationCodeList.length > 0) {
                const response = await post(`${window.CONSTANTS.get(`APP.API_BASE`)}/Manager/UpdateOrganizationExpirationList`, _t.params, {});
                if (response.result === true) {
                    params.search(params.currentPage);
                    $(`#listAllCheck`).prop("checked", false);
                }
                else {
                    alert(`데이타 업데이트 실패`);
                }
            }
            else {
                alert(`${_t.text} 하려는 데이타를 선택하세요!`);
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
            stopEvent(e);
            const parameter = {
                'organizationCodeList': [],
            };
            parameter.organizationCodeList.push($(this).parents('.cm-tr').attr('data-code'));
            if(Number($(`.radio-input[name="expiration"]:checked`).val()) === 0) {
                parameter["expiration"] = 1;
            }
            else {
                parameter['expiration'] = 0;
            }

            const response = await post(`${window.CONSTANTS.get(`APP.API_BASE`)}/Manager/UpdateOrganizationExpirationList`, parameter, {});
            if (response.result === true) {
                params.search(params.currentPage);
            }
            else {
                alert(`데이타 업데이트 실패`);
            }
        });
    }
};

export { event };