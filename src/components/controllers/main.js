
/**
 * 기능을 처리할 콤포넌트 결정
 * @fileoverview
 * 1. url 을 분석하여 로딩할 콤포넌트 결정(URL_CHANGE.PROCESS())
 * 2. 사용자의 기본 인증이 아닌, 추가적인 인증 확인 처리
 * 3. 최초 접속시 동적 라우팅 처리
 * 4. 메뉴(그룹) 변경시 로딩 콤포넌트를 띄운다.
 *    - 로딩 콤포넌트에서 초기 데이타 로딩 처리를 한다.
 *      - 로그인 직후에는 로그인에서 처리를 한다.
 *      > 초기 데이타 로딩은 전역 상태로 관리를 하게돼서 인증 확인 후 한번만 하게 된다.
 *    - 종료는 각 기능을 담당하는 콤포넌트에서 마지막이라고 판단되는곳에서 종료처리를 명시적으로 한다.
 */

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

    // navigate 로 기본적인 history를 하고, url강제로 바꿀때만 history에 추가를 한다.
    if ((String.isNullOrWhitespace(url.change.path) === false && isDone === true) || url.controller === `login`) {
        HISTORY_PUSH_STATE(url.change.path);
    }

    // 컨트롤러(메뉴 또는 기능)이 바꾸면 기능별 전역 상수를 초기화 시키고, 동적 콤포넌트를 unmount 처리한다.
    if (url.change.controller === true || url.change.action === true) {
        // 자체 전역 변수 초기화
        window.CONSTANTS.init();
        // 동적 콤포넌트 > unmount 처리
        Array.routeChangeCallback();
    }

    // 로그인에서는 사이트 초기 데이타 로딩이 필요가 없어, 분리 처리를 함
    if (url.controller === `login`) {
        return <Layout url={url} onLastLoad={onLastLoad}/>;
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