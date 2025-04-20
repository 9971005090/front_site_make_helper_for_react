
/**
 * 기능 처리가 모두 끝난후 실행되는 후처리 파일
 * @fileoverview
 * 1. main.js 에서 자식 콤포넌트로 전달하는 onLastLoad 콜백함수를 개발자가 마지막이라고 생각되는 콤포넌트에서 실행 시킨다.
 * 2. 현재는 로딩 이미지만 제거하는 부분만 있음, 향후 버전업에 따라 내용이 추가 필요함
 */

import React from "react";
import $ from "cash-dom";

const Post = async function() {
    console.log(":::::Post:::::", Date.getNow());
    if ($(`#loading-process-parent`).length > 0) {
        // 바로 처리를 하면, 사람의 눈으로 판단할 수 없어, 약간의 시간을 주고 없앤다.
        setTimeout(function() {
            $('#loading-process-parent').hide();
        }, 100);
    }

    // 사이트별 추가 코드
    ///////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////////////////
};
export { Post };