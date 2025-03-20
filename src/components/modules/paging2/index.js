// src/components/modules/paging2/index.js
import React from "react";
import $ from "cash-dom";
import { stopBubbling } from "../../../utils/stop-bubbling";
import { format } from 'date-fns';
import { CommonReturn } from "../../../components/utils/common-return";

export const Paging = ({ paramSearchFunc, paramFetchData, paramCurrentPage, paramItemsPerPage, paramPagesPerPage }) => {
    const [pageChange, setPageChange] = React.useState(false);
    const [Component, setComponent] = React.useState(null);
    const [pagingInfo, setPagingInfo] = React.useState({
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
    });
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
                if(paramCurrentPage === 1) {
                    return;
                }
                else {
                    selectedPage = 1;
                }
            }
            if(id === "Prev") {
                if(paramCurrentPage === 1) {
                    return;
                }
                else {
                    selectedPage = paramCurrentPage - 1;
                }
            }
            if(id === "Next") {
                if(paramCurrentPage === pagingInfo.page.total) {
                    return;
                }
                else {
                    selectedPage = paramCurrentPage + 1;
                }
            }
            if(id === "Last") {
                if(paramCurrentPage === pagingInfo.page.total) {
                    return;
                }
                else {
                    selectedPage = pagingInfo.page.total;
                }
            }

            if(typeof selectedPage !== "string") {
                if(selectedPage === paramCurrentPage) {
                    return;
                }
            }
            setPageChange((state) => !state);
            paramSearchFunc(selectedPage);
            // setIsLoaded((state) => !state);
        });
        return () => {
            // $(`.page-item`).off(`click`);
        };
    }, [isLoaded]); // DesignComponent가 로딩되면 이벤트 설정

    // 페이징 정보를 설정하는 useEffect
    React.useEffect(() => {
        if (paramFetchData !== null && paramFetchData.totalCount > 0) {
            const newPagingInfo = {
                page: {
                    total: Math.ceil(paramFetchData.totalCount / paramItemsPerPage),
                    first: 1,
                    last: Math.min(paramPagesPerPage, Math.ceil(paramFetchData.totalCount / paramItemsPerPage)),
                    active: false,
                    numbers: [],
                },
                methodView: {
                    // first: currentPage > 1,
                    // prev: currentPage > 1,
                    // next: currentPage < Math.ceil(paramTotalCount / paramItemsPerPage),
                    // last: currentPage < Math.ceil(paramTotalCount / paramItemsPerPage),
                    first: true,
                    prev: true,
                    next: true,
                    last: true,
                },
                view: true
            };

            for (let i = newPagingInfo.page.first; i <= newPagingInfo.page.last; i++) {
                newPagingInfo.page.numbers.push({
                    number: i,
                    active: i === paramCurrentPage,
                });
            }
            setPagingInfo(newPagingInfo);
        }
    }, [paramFetchData, pageChange]);

    // 동적 컴포넌트 로딩
    React.useEffect(() => {
        (async () => {
            await import(`./assets/css/${window.CONSTANTS.get(`APP.THEME`)}/index.css`);
            const { Design } = await import(`./template/${window.CONSTANTS.get(`APP.THEME`)}/index`);
            setComponent(Design.index);
        })();
    }, []);

    return CommonReturn(Component)({pagingInfo: pagingInfo, onLoad: onLoad, loadingTypeTitle: `paging`, pageChange: pageChange, paramFetchData: paramFetchData});
};

