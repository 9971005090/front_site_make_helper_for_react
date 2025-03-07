// src/components/modules/paging2/index.js
import React, { useState, useEffect, Suspense } from "react";
import $ from "cash-dom";
import stopEvent from "../../../utils/stopEvent";
import { format } from 'date-fns';
import { CommonReturn } from "../../../components/utils/common-return";
import(`./assets/css/${window.CONSTANTS.get(`APP.THEME`)}/index.css`);

export const Paging = ({ paramSearchFunc, paramTotalCount, paramCurrentPage, paramItemsPerPage, paramPagesPerPage, pagingChange }) => {
    const [pageChange, setPageChange] = useState(false);
    const [Component, setComponent] = useState(null);
    const [pagingInfo, setPagingInfo] = useState({
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
    const [isLoaded, setIsLoaded] = useState(false);
    const handleComponentLoad = () => {
        setIsLoaded((state) => !state);
    };

    React.useEffect(() => {
        ////////////////////////////////////////////////////////////////////
        $(`.page-item`).off(`click`).on(`click`, function (e) {
            stopEvent(e);
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
            setIsLoaded((state) => !state);
        });
        return () => {
            // $(`.page-item`).off(`click`);
        };
    }, [isLoaded]); // DesignComponent가 로딩되면 이벤트 설정

    // 페이징 정보를 설정하는 useEffect
    useEffect(() => {
        if (paramTotalCount > 0) {
            const newPagingInfo = {
                page: {
                    total: Math.ceil(paramTotalCount / paramItemsPerPage),
                    first: 1,
                    last: Math.min(paramPagesPerPage, Math.ceil(paramTotalCount / paramItemsPerPage)),
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
    }, [pagingChange, pageChange]);

    // 동적 컴포넌트 로딩
    useEffect(() => {
        (async () => {
            const { Design } = await import(`./template/${window.CONSTANTS.get(`APP.THEME`)}/index`);
            setComponent(Design.index);
        })();
    }, []);

    return CommonReturn(Component)({pagingInfo: pagingInfo, onLoad: handleComponentLoad, loadingTypeTitle: `paging`, pageChange: pageChange, pagingChange: pagingChange});
};

