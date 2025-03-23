import $ from "cash-dom";
import { format } from 'date-fns';
import { stopBubbling } from "../../../../../utils/stop-bubbling";
import { CustomAlert } from '../../../../../components/modules/custom-alert/index';
import {UTIL as ORGAN_UTIL} from "../../../../../utils/api/organ";
import {Notify} from "../../../../../utils/global-utils";

const event = function(params) {
    // 버튼 이름 바꾸기
    if(Number($(`.radio-input[name="expiration"]:checked`).val()) === 0){
        $(`.btn-delete`).text(`비활성화`).removeClass(`btn-restore`);
        $(`.btn-all-delete`).text(`선택 비활성화`).removeClass(`btn-all-restore`);
    } else{
        $(`.btn-delete`).text(`활성화`).addClass(`btn-restore`);
        $(`.btn-all-delete`).text(`선택 활성화`).addClass(`btn-all-restore`);
    }

    $(`.btn-delete`).off(`click`).on(`click`, async function(e) {
        stopBubbling(e);


        const update = {
            buttonTitle: `비활성화`,
            params: {
                'organizationCodeList': [$(this).parents('.cm-tr').attr('data-code')],
                'expiration': 1
            },
            title: `정말 활성화 하시겠습니까?`
        };
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
            CustomAlert.open({
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

    $(`.button-update`).off(`click`).on(`click`, function(e) {
        stopBubbling(e);
        params.navigate(`/organ/edit?code=${$(this).closest('.cm-tr').attr(`data-code`)}`);
    });
};

export { event };