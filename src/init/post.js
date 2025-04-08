// src/components/init/post.js
import React from "react";
import $ from "cash-dom";

const Post = function() {
    console.log(":::::Post:::::", Date.getNow());
    if ($(`#loading-process-parent`).length > 0) {
        // 바로 처리를 하면, 사람의 눈으로 판단할 수 없어, 약간의 시간을 주고 없앤다.
        setTimeout(() => {
            $('#loading-process-parent').hide();
        }, 100);
    }

    // 모든 처리 후 후행 처리가 필요한 부분 진행
    // 예를 들어 팝업창 등. 사이트 진행과 별개인 부분들..
    // 통계 작업이라던지..
    // 사이트의 ui처리와 상관없는 worker 처리라던지.
    // 뭐 암튼 사이트 처리 후 별개로 진행이 필요한 것들..
    // 현재는 어떻게 마지막에 나타나게 할지 모르겠네..쩝.
};
export { Post };