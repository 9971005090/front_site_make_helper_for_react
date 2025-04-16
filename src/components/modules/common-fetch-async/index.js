// src/components/modules/common-fetch-async/index.js

import React from "react";
import ReactDOM from "react-dom/client";

import $ from "cash-dom";
import { CommonReturn } from "../../../components/utils/common-return";

const CommonFetchAsync = (function() {
    let container = null;
    let root = null;
    const CommonFetchComponent = function({ search, paramFetchData, currentPage, paramType, now, navigate }) {
        const [Component, setComponent] = React.useState(null);
        const backUrl = React.useRef({controller: null});
        const url = React.useRef({controller: paramType});

        const setAddEvent = async function() {
            Array.routeChangeCallback(handleRouteChange);

            ////////////////////////////////////////////////////////////////////
            // 유지 보수를 위해, 파일로 빼지만, 사용하는 함수나 state 등은 모두 파라미터로 보낸다.
            (await import(`./events/${window.CONSTANTS.get(`APP.THEME`)}/${paramType}`)).event({
                search: search,
                currentPage: currentPage.current,
                navigate: navigate
            });
            ////////////////////////////////////////////////////////////////////
        };

        React.useEffect(function() {
            (async function() {
                const { Design } = await import(`./template/${window.CONSTANTS.get(`APP.THEME`)}/${paramType}`);
                setComponent(Design.index);
                backUrl.current.controller = paramType;
            })();
        }, []);
        return CommonReturn(Component)({ paramFetchData: paramFetchData, loadingTypeTitle: `common-fetch`, now: now, onLoad: setAddEvent, backUrl: backUrl.current, url: url.current });
    };

    const run = function(selector, search, paramFetchData, currentPage, paramType, now, isFirst, navigate) {
        container = $(selector)[0];
        if (String.isNullOrWhitespace(root) === true) {
            root = ReactDOM.createRoot(container);
        }
        else {
            if (isFirst === true) {
                root.unmount();
                root = ReactDOM.createRoot(container);
            }
        }
        root.render(
            <CommonFetchComponent search={search} paramFetchData={paramFetchData} currentPage={currentPage} paramType={paramType} now={now} navigate={navigate} />
        );
    };

    // const close = function() {
    //     if (root !== null) {
    //         root.unmount();
    //     }
    //
    //     // if (container !== null) {
    //     //     container.remove();
    //     // }
    //
    // };

    const handleRouteChange = function() {
        // 빠르게 처리가 되다보니, main 콤포넌트의 랜더링과 겹쳐 실행이 될 수 있다.
        // 그래서 최대한 늦춰서 실행되게. 결국 main 콤포넌트의 랜더링이 끝나고 실행될 수 있게
        setTimeout(function() {
            if (root !== null) {
                root.unmount();  // unmount 호출
                root = null;      // root 초기화
            }
            if (container !== null) {
                container.remove();  // DOM 요소 제거
                container = null;    // container 초기화
            }
        }, 100);
    };

    return {
        run: run,
        // close: close
    };
})();

export { CommonFetchAsync };


