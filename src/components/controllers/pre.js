// src/components/modules/layout/index.js
import React from "react";

const Pre = function() {
    console.log(":::::Pre:::::", Date.getNow());

    // 루트로 접속하느냐?
    // 인증 사이트인데, 인증이 안되서 로그아웃으로 보내느냐만 결정.
    // 최종 controller 과 action, 그리고 query string 정리
    // controller 보다 이전에 실행해야 할 선행 처리를 진행
    // 하위 layout 에서는 레이아웃만 찍게...



};

export { Pre };