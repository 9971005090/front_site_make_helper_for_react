// src/components/controllers/main.js
import React from "react";

import { useLocation } from "react-router-dom";
import { LoadingProcess } from '../../components/utils/loading-process';
import { Layout } from '../../components/modules/layout';
import { Post } from '../../init/post';
import { URL_CHANGE } from '../../utils/url-change/index';
import { PUSH_STATE as HISTORY_PUSH_STATE } from "../../utils/history/index";
import { useFirstLoad } from "../../hooks/first-load";

export const Main = function() {
    // 상태를 구독 중인 일반 함수를 호출하는 컴포넌트도 리렌더링된다
    console.log(":::::Main:::::", Date.getNow());
    const { isDone } = useFirstLoad();
    const location = useLocation();
    const onLastLoad = async function() {
        Post();
    };

    const url = URL_CHANGE.PROCESS(location);
    if ((String.isNullOrWhitespace(url.change.path) === false && isDone === true) || url.controller === `login`) {
        HISTORY_PUSH_STATE(url.change.path);
        // 자체 전역 변수 초기화
        window.CONSTANTS.init();
    }

    if (url.change.controller === true) {
        Array.routeChangeCallback();
    }

    // 현재 메뉴 정보 세팅
    // setMenuInfo(url);
    if (url.controller === `login`) {
        return (
            <>
                <Layout url={url} onLastLoad={onLastLoad}/>
            </>
        );
    }
    else {
        return (
            <>
                <LoadingProcess key={Date.getNow()}/>
                {isDone ? <Layout url={url} onLastLoad={onLastLoad}/> : null}
            </>
        );
    }
};