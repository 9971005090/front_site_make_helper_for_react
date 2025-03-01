// src/components/modules/paging2/index.js
import React, { useState, useEffect, Suspense } from "react";
import $ from "cash-dom";
import stopEvent from "../../../utils/stopEvent";

export const Paging = ({ paramSearchFunc, paramTotalCount, paramCurrentPage, paramItemsPerPage, paramPagesPerPage }) => {
    console.log("paging::::paramCurrentPage:::", paramCurrentPage);
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

    // 페이징 정보를 설정하는 useEffect
    useEffect(() => {
        if (paramTotalCount > 0) {
            console.log("paramTotalCount::::", paramTotalCount);
            const newPagingInfo = {
                page: {
                    total: Math.ceil(paramTotalCount / paramItemsPerPage),
                    first: 1,
                    last: Math.min(paramPagesPerPage, Math.ceil(paramTotalCount / paramItemsPerPage)),
                    active: false,
                    numbers: [],
                },
                methodView: {
                    first: paramCurrentPage > 1,
                    prev: paramCurrentPage > 1,
                    next: paramCurrentPage < Math.ceil(paramTotalCount / paramItemsPerPage),
                    last: paramCurrentPage < Math.ceil(paramTotalCount / paramItemsPerPage),
                },
            };

            for (let i = newPagingInfo.page.first; i <= newPagingInfo.page.last; i++) {
                newPagingInfo.page.numbers.push({
                    number: i,
                    active: i === paramCurrentPage,
                });
            }
            setPagingInfo(newPagingInfo);
        }
    }, [paramTotalCount, paramCurrentPage, paramItemsPerPage, paramPagesPerPage]);

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

    React.useEffect(() => {
        if (Component !== null) {
            // 콤포넌트 최초 로딩 후
            ////////////////////////////////////////////////////////////////////
            $(`.page-item`).off(`click`).on(`click`, function (e) {
                stopEvent(e);
                console.log("page-item::::");
                const item = $(this);
                const id = item.find(`button`).attr(`aria-label`);
                let selectedPage = Number(item.children(`span`).text());
                console.log("selectedPage:::", selectedPage, paramCurrentPage);
                if(id !== undefined) {
                    selectedPage = id;
                }
                if(id === "Prev") {
                    console.log("paramCurrentPage::::", paramCurrentPage);
                    if(paramCurrentPage === 1) {
                        return;
                    }
                    else {
                        selectedPage = paramCurrentPage - 1;
                    }
                }
                if(id === "First") {
                    if(paramCurrentPage === 1) {
                        return;
                    }
                    else {
                        selectedPage = 1;
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
                paramSearchFunc(selectedPage);
            });
            return () => {
                $(`.page-item`).off(`click`);
            };
            ////////////////////////////////////////////////////////////////////
        }
    }, [Component]); // DesignComponent가 로딩되면 이벤트 설정

    return (
        <Suspense fallback={<div>Paging Loading...</div>}>
            {Component ? <Component pagingInfo={pagingInfo} /> : <p>Data Loading...</p>}
        </Suspense>
    );
};

