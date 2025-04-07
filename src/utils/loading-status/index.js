// src/components/modules/layout/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import $ from "cash-dom";

const LOADING_STATUS = function(mode = `start`) {
    console.log(":::::Post:::::", Date.getNow());
    let message = `사이트 로딩 시작`;
    if (mode === `end`) {
        message = `사이트 로딩 완료`;
    }
    if ($(`#site-rendering`).length <= 0) {
        const container = $(`<div>`).attr(`id`, `site-rendering`);
        const root = ReactDOM.createRoot(container[0]);
        // const container = document.createElement("div");
        // const root = ReactDOM.createRoot(container);
        // document.body.appendChild(container);
        $(`body`).append(container);

        root.render(
            <><p style={{display: `None`}}>{message}</p></>
        );
    }
    else {
        $(`#site-rendering > p`).text(message);
    }
    // SiteRendering.run(`end`);

    // 모든 처리 후 후행 처리가 필요한 부분 진행
    // 예를 들어 팝업창 등. 사이트 진행과 별개인 부분들..
    // 통계 작업이라던지..
    // 사이트의 ui처리와 상관없는 worker 처리라던지.
    // 뭐 암튼 사이트 처리 후 별개로 진행이 필요한 것들..
    // 현재는 어떻게 마지막에 나타나게 할지 모르겠네..쩝.
};
export { LOADING_STATUS };