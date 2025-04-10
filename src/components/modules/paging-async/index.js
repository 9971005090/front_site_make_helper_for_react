// src/components/modules/paging2/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { subscribeToRouteChange } from "../../../hooks/route-change";
import $ from "cash-dom";
import { stopBubbling } from "../../../utils/stop-bubbling";
import { CommonReturn } from "../../../components/utils/common-return";

const PagingAsync = (function() {
    let container = null;
    let root = null;
    const PagingComponent = function ({ searchFunc, totalCount, currentPage, now, itemsPerPage, pagesPerPage }) {
        const [Component, setComponent] = React.useState(null);
        const pagingInfo = {
            page: {
                total: 0,
                first: 0,
                last: 0,
                active: false,
                numbers: [],
            },
            methodView: {
                first: false,
                prev: false,
                next: false,
                last: false,
            },
            view: false
        };
        if (totalCount > 0) {
            pagingInfo.page = {
                total: Math.ceil(totalCount / itemsPerPage),
                first: 1,
                last: Math.min(pagesPerPage, Math.ceil(totalCount / itemsPerPage)),
                active: false,
                numbers: [],
            };
            pagingInfo.methodView = {
                // first: currentPage > 1,
                // prev: currentPage > 1,
                // next: currentPage < Math.ceil(paramTotalCount / itemsPerPage),
                // last: currentPage < Math.ceil(paramTotalCount / itemsPerPage),
                first: true,
                prev: true,
                next: true,
                last: true,
            };
            pagingInfo.view = true;

            for (let i = pagingInfo.page.first; i <= pagingInfo.page.last; i++) {
                pagingInfo.page.numbers.push({
                    number: i,
                    active: i === currentPage,
                });
            }
        }

        const setAddEvent = function() {
            // ✅ URL 변경 감지 구독
            subscribeToRouteChange(handleRouteChange);

            $(`.page-item`).off(`click`).on(`click`, function(e) {
                stopBubbling(e);
                const item = $(this);
                const id = item.find(`button`).attr(`aria-label`);
                let selectedPage = Number(item.children(`span`).text());
                if (id !== undefined) {
                    selectedPage = id;
                }
                if (id === "First") {
                    if (currentPage === 1) {
                        return;
                    }
                    else {
                        selectedPage = 1;
                    }
                }
                if (id === "Prev") {
                    if (currentPage === 1) {
                        return;
                    }
                    else {
                        selectedPage = currentPage - 1;
                    }
                }
                if (id === "Next") {
                    if (currentPage === pagingInfo.page.total) {
                        return;
                    }
                    else {
                        selectedPage = currentPage + 1;
                    }
                }
                if (id === "Last") {
                    if (currentPage === pagingInfo.page.total) {
                        return;
                    }
                    else {
                        selectedPage = pagingInfo.page.total;
                    }
                }
                if (typeof selectedPage !== "string") {
                    if (selectedPage === currentPage) {
                        return;
                    }
                }
                searchFunc(selectedPage);
            });
        };

        // 동적 컴포넌트 로딩
        React.useEffect(function() {
            (async function() {
                await import(`./assets/css/${window.CONSTANTS.get(`APP.THEME`)}/index.css`);
                const { Design } = await import(`./template/${window.CONSTANTS.get(`APP.THEME`)}/index`);
                setComponent(Design.index);
            })();
        }, []);

        return CommonReturn(Component)({pagingInfo: pagingInfo, onLoad: setAddEvent, loadingTypeTitle: `paging`, now: now});
    };

    const run = function(selector, searchFunc, totalCount, currentPage, now, isFirst, itemsPerPage = 10, pagesPerPage = 10) {
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
            <PagingComponent searchFunc={searchFunc} totalCount={totalCount} currentPage={currentPage} now={now} itemsPerPage={itemsPerPage} pagesPerPage={pagesPerPage} onUnmount={handleRouteChange} />
        );
    };

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

    // const close = function() {
    //     if (root) {
    //         root.unmount();  // unmount 호출
    //         root = null;  // root 초기화
    //     }
    //     if (container) {
    //         container.remove();  // DOM 요소 제거
    //         container = null;  // container 초기화
    //     }
    // };

    return {
        run: run,
        // close: close
    };
})();

export { PagingAsync };






