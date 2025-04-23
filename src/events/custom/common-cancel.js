
/**
 * 공통 취소 이벤트 처리 파일
 * @fileoverview
 * - 목록 화면으로 이동하는 취소 버튼(.btn-go-list) 클릭 이벤트 처리
 * - 사용자 입력 내용 삭제 안내 후 이동 여부 확인
 * - CustomAlertAsync을 활용한 사용자 확인(alert) 기능 포함
 */

import React from "react";
import $ from "cash-dom";
import { CustomAlertAsync } from '../../components/modules/custom-alert-async/index';
import { nl2br } from "../../helpers/text";

/**
 * 목록 이동 이벤트
 * @param {Object} params - 이벤트 실행 시 전달되는 파라미터
 * @param {Function} params.navigate - 페이지 이동을 처리하는 react useNavigte 훅
 * @param {string} params.controllerName - 이동할 컨트롤러(페이지) 이름
 */
const event = function(params) {
    $(`.btn-go-list`).off(`click`).on(`click`, function(){
        /**
         * 확인 버튼 클릭 시 실행할 콜백 함수
         * - 목록 화면으로 이동
         * - CustomAlertAsync 창 닫기(unmount 처리)
         */
        const okBtnCallback = function () {
            params.navigate(`/${params.controllerName}/index`, { state: { back: location.pathname } });
            CustomAlertAsync.close();
        };
        CustomAlertAsync.open({
            msg: function() {
                return (<span>{nl2br(`목록 화면으로 이동하시겠습니까?\n입력 하신 내용은 모두 삭제됩니다.`)}</span>);
            },
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
    });
};

export { event };