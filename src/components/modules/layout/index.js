
/**
 * 레이아웃 콤포넌트 처리 파일
 * @fileoverview
 * 1. 초기 설정(INITIALIZE_APP())
 *    - 내장 객체에 확장 함수 등록
 *    - 앱 전역 상수 등록(리덕스 관리가 아닌 window 객체에서 자체 관리): Array, Date, File, Number, String
 *      - 앱 관련 상수, 계정 권한 상수, rest api 결과 코드 상, 사이트에서 사용할 환경 변수 관련 상수
 * 2. 루트 콤포넌트인 App 랜더링
 */

import React from "react";
import $ from "cash-dom";
import { CommonReturn } from "../../../components/utils/common-return";

export const Layout = function({ url, onLastLoad }) {
    console.log(":::::Layout:::::", Date.getNow());
    const [ Component, setComponent ] = React.useState(null);
    // 기존 주소의 controller 확인을 위해
    // navigate 로 재랜더링시, useState 로 세팅된 내용은 계속 유지되기에
    // 새로 받은 주소의 controller에서만 처리되게.
    const backUrl = React.useRef({controller: null, action: null});

    const responsive = function() {
        if (1024 >= window.innerWidth && 768 < window.innerWidth) {
            $(`#root`).removeClass("pc mobile mobile-small").addClass("tablet");
        }
        else if (768 >= window.innerWidth && 488 < window.innerWidth) {
            $(`#root`).removeClass("tablet pc mobile-small").addClass("mobile");
        }
        else if (488 >= window.innerWidth) {
            $(`#root`).removeClass("tablet pc mobile").addClass("mobile-small");
        }
        else {
            $(`#root`).removeClass("tablet mobile mobile-small").addClass("pc");
        }
        if ($(`#root`).hasClass("pc") === true) {
            if ($(`.cm-left-nav`).hasClass("on") === true) {
                $(`.cm-left-nav`).removeClass("on");
                $(`.burger-btn`).removeClass("active");
            }
        }
        else {
            if ($(`.cm-left-nav`).hasClass("on") === false) {
                $(`.cm-left-nav`).addClass("on");
                $(`.burger-btn`).addClass("active");
            }
        }
    };
    const setAddEvent = function() {
        responsive();
        window.addEventListener("resize", function() {
            responsive();
        });
    };

    React.useEffect(function() {
        (async function() {
            const { Design } = await import(`./template/${window.CONSTANTS.get(`APP.THEME`)}/layout`);
            console.log(":::::Layout import:::::", Date.getNow());
            backUrl.current = url;
            setComponent(Design.index);
        })();
    }, [url]);

    return CommonReturn(Component)({ url: url, loadingTypeTitle: `layout`, onLoad: setAddEvent, onLastLoad: onLastLoad, backUrl: backUrl.current });
};