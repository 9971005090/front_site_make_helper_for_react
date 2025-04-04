// src/components/controllers/main.js
import React from "react";
import { useLocation } from "react-router-dom";
import { Pre } from '../../components/controllers/pre';
import { Layout } from '../../components/modules/layout';
import { Post } from '../../components/controllers/post';
import { URL_CHANGE } from '../../utils/url-change/index';
import { PUSH_STATE as HISTORY_PUSH_STATE } from "../../utils/history/index";
import { useFirstLoad } from "../../hooks/first-load";
// import { set as setMenuInfo } from "../../utils/custom/menuInfo";

export const Main = function({ url }) {
    // 상태를 구독 중인 일반 함수를 호출하는 컴포넌트도 리렌더링된다
    console.log(":::::Main:::::", Date.getNow());
    const { isDone } = useFirstLoad();
    const location = useLocation();

    const onLastLoad = async function() {
        Post(); // 메인 내용 모두 처리 후 가장 마지막에 실행을 해야하는데, 그걸 알 수 없음
    };

    Pre();

    url = URL_CHANGE.PROCESS(location);
    if ((String.isNullOrWhitespace(url.change.path) === false && isDone === true) || url.controller === `login`) {
        HISTORY_PUSH_STATE(url.change.path);
    }

    // 현재 메뉴 정보 세팅
    // setMenuInfo(url);
    if (url.controller === `login`) {
        return <Layout url={url} onLastLoad={onLastLoad}/>;
    }
    else {
        return isDone ? <Layout url={url} onLastLoad={onLastLoad}/> : null;
    }
};