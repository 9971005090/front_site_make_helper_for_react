// src/components/modules/common-fetch-async/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { subscribeToRouteChange } from "../../../hooks/route-change";

import $ from "cash-dom";
import { CommonReturn } from "../../../components/utils/common-return";

const CommonFetchAsync = (function() {
    let container = null;
    let root = null;
    const CommonFetchComponent = function({ search, paramFetchData, currentPage, paramType, now, navigate }) {
        const [Component, setComponent] = React.useState(null);

        const setAddEvent = async function() {
            // ✅ URL 변경 감지 구독
            subscribeToRouteChange(handleRouteChange);

            ////////////////////////////////////////////////////////////////////
            // 유지 보수를 위해, 파일로 빼지만, 사용하는 함수나 state 등은 모두 파라미터로 보낸다.
            (await import(`./events/${window.CONSTANTS.get(`APP.THEME`)}/index`)).event({
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
            })();
        }, []);

        return CommonReturn(Component)({ paramFetchData: paramFetchData, loadingTypeTitle: `common-fetch`, now: now, onLoad: setAddEvent });
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
        console.log("handleRouteChange:::::: 실행됨");
        if (root !== null) {
            root.unmount();  // unmount 호출
            root = null;      // root 초기화
        }
        if (container !== null) {
            container.remove();  // DOM 요소 제거
            container = null;    // container 초기화
        }
    };

    return {
        run: run,
        // close: close
    };
})();

export { CommonFetchAsync };


