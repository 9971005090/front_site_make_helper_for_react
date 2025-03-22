import $ from "cash-dom";
import { format } from 'date-fns';
import { stopBubbling } from "../../../../../utils/stop-bubbling";
import { CustomAlert } from '../../../../../components/modules/custom-alert/index';

const event = function(params) {
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
    });

    $(`.button-update`).off(`click`).on(`click`, function (e) {
        stopBubbling(e);
        params.navigate(`/organ/edit?code=${$(this).closest('.cm-tr').attr(`data-code`)}`);
    });
};

export { event };