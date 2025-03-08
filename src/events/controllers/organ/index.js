import $ from "cash-dom";
import stopEvent from "../../../utils/stopEvent";
import { format } from 'date-fns';
import {post} from "../../../utils/axiosApi";

const event = {
    'index': function(search, fetchDataState) {
        $(`.form-common-search-button`).off(`click`).on('click', function(e){
            stopEvent(e);
            if (fetchDataState.current === `ready`) {
                $(`.form-common-search`)[0].dispatchEvent(new Event("submit", { bubbles: false, cancelable: false }));
            }
            else {
                alert("데이타 조회중입니다. 잠시만 기다리세요");
            }
        });

        $(`.form-common-search`).off(`submit`).on(`submit`, async function (e) {
            stopEvent(e);
            search(1);
            return;
        });
    },
    'datas': function(search, currentPage) {
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
                search(currentPage);
            }
            else {
                alert(`데이타 업데이트 실패`);
            }
        });
    }
};

export { event };