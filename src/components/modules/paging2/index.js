// src/components/modules/paging2/index.js
import React, { useState, useEffect, Suspense } from "react";
import $ from "cash-dom";
import stopEvent from "../../../utils/stopEvent";
import { format } from 'date-fns';

export const Paging = ({ paramSearchFunc, paramTotalCount, paramCurrentPage, paramItemsPerPage, paramPagesPerPage }) => {
    const [currentPage, setCurrentPage] = useState(paramCurrentPage);
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
        }
    });
    const [isLoaded, setIsLoaded] = useState(false); // 로딩 완료 상태 추적
    const handleComponentLoad = () => {
        setIsLoaded(true);
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
            setIsLoaded(false);
            setCurrentPage(selectedPage);
            paramSearchFunc(selectedPage);
        });
        return () => {
            $(`.page-item`).off(`click`);
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
            };

            for (let i = newPagingInfo.page.first; i <= newPagingInfo.page.last; i++) {
                newPagingInfo.page.numbers.push({
                    number: i,
                    active: i === currentPage,
                });
            }
            setPagingInfo(newPagingInfo);
        }
    }, [currentPage]);

    // 스타일 추가
    useEffect(() => {
        (async () => {
            await import(`./assets/css/${window.CONSTANTS.get(`APP.THEME`)}/index.css`);
        })();
    }, []);

    // 동적 컴포넌트 로딩
    useEffect(() => {
        (async () => {
            const { Design } = await import(`./template/${window.CONSTANTS.get(`APP.THEME`)}/index`);
            setComponent(Design.index);
        })();
    }, []);

    return (
        <Suspense fallback={<div>Paging Loading...</div>}>
            {Component ? <Component key={currentPage} pagingInfo={pagingInfo} onLoad={handleComponentLoad} /> : <p>Data Loading...</p>}
        </Suspense>
    );
};

