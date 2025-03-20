// src/components/modules/paging2/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import $ from "cash-dom";
import { stopBubbling } from "../../../utils/stop-bubbling";
import { CommonReturn } from "../../../components/utils/common-return";

const PagingAsync = (() => {
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

        const [isLoaded, setIsLoaded] = React.useState(false);
        const onLoad = () => {
            setIsLoaded((state) => !state);
        };

        React.useEffect(() => {
            ////////////////////////////////////////////////////////////////////
            $(`.page-item`).off(`click`).on(`click`, function (e) {
                stopBubbling(e);
                const item = $(this);
                const id = item.find(`button`).attr(`aria-label`);
                let selectedPage = Number(item.children(`span`).text());
                if(id !== undefined) {
                    selectedPage = id;
                }
                if(id === "First") {
                    if(currentPage === 1) {
                        return;
                    }
                    else {
                        selectedPage = 1;
                    }
                }
                if(id === "Prev") {
                    if(currentPage === 1) {
                        return;
                    }
                    else {
                        selectedPage = currentPage - 1;
                    }
                }
                if(id === "Next") {
                    if(currentPage === pagingInfo.page.total) {
                        return;
                    }
                    else {
                        selectedPage = currentPage + 1;
                    }
                }
                if(id === "Last") {
                    if(currentPage === pagingInfo.page.total) {
                        return;
                    }
                    else {
                        selectedPage = pagingInfo.page.total;
                    }
                }

                if(typeof selectedPage !== "string") {
                    if(selectedPage === currentPage) {
                        return;
                    }
                }
                searchFunc(selectedPage);
                // setIsLoaded((state) => !state);
            });
            return () => {
                // $(`.page-item`).off(`click`);
            };
        }, [isLoaded]);

        // 동적 컴포넌트 로딩
        React.useEffect(() => {
            (async () => {
                await import(`./assets/css/${window.CONSTANTS.get(`APP.THEME`)}/index.css`);
                const { Design } = await import(`./template/${window.CONSTANTS.get(`APP.THEME`)}/index`);
                setComponent(Design.index);
            })();
        }, []);

        return CommonReturn(Component)({pagingInfo: pagingInfo, onLoad: onLoad, loadingTypeTitle: `paging`, now: now});
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
            <PagingComponent searchFunc={searchFunc} totalCount={totalCount} currentPage={currentPage} now={now} itemsPerPage={itemsPerPage} pagesPerPage={pagesPerPage} />
        );
    };

    const close = () => {
        if (root) {
            root.unmount();  // unmount 호출
            root = null;  // root 초기화
        }
        if (container) {
            container.remove();  // DOM 요소 제거
            container = null;  // container 초기화
        }
    };

    return {
        run: run,
        close: close
    };
})();

export { PagingAsync };






