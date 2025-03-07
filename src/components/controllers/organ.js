// src/controllers/organ.js
import React, {useEffect, useState} from "react";
import $ from "cash-dom";
import { format } from 'date-fns';
import { useAuth } from "../../hooks/auth";
import stopEvent from "../../utils/stopEvent";
import {post} from "../../utils/axiosApi";
import addParams from "../../utils/custom/addParams";
import formParser from "../../utils/formParser";
import { CommonReturn } from "../../components/utils/common-return";

const Controller = {
    index: () => {
        // 디자인 컴포넌트를 반환
        return ({ uriParams }) => {
            const { controllerName, actionName } = uriParams;
            const [Component, setComponent] = React.useState(null);
            const [fetchData, setFetchData] = React.useState(null);
            const [totalCount, setTotalCount] = React.useState(0);
            const [pagingChange, setPagingChange] = React.useState(false);
            const [isLoaded, setIsLoaded] = useState(false);
            const fetchDataState = React.useRef("ready"); // ready, searching
            const itemsPerPage = React.useRef(10);
            const pagesPerPage = React.useRef(10);
            const currentPage = React.useRef(1);
            const handleComponentLoad = () => {
                setIsLoaded(true);
            };

            const search = async function(setPage = 1) {
                // setPage는 실시간으로 이용하고, 랜더링을 다시 하기 위해서는 useState를 사용한다. 불편하네.
                currentPage.current = setPage;
                const form = formParser(`.form-common-search`);
                const parameter = {
                    'search': form['search'],
                    'pageNumber': currentPage.current,
                    'count': itemsPerPage.current,
                    'expiration': form['expiration'],
                };
                fetchDataState.current = `searching`;
                const response = await post(`${window.CONSTANTS.get(`APP.API_BASE`)}/Manager/SelectOrganizationPage`, addParams(parameter, form), {});
                if (response.result === true) {
                    setFetchData(response);
                    setTotalCount(response.organizationList !== null ? response.totalCount : 0);
                    fetchDataState.current = `ready`;
                    setPagingChange(function(state) {
                        return state === false ? true : false;
                    });
                }
                else {
                    alert(`데이타 조회 실패`);
                    fetchDataState.current = `ready`;
                }
            };
            useEffect(() => {
                // console.log(`useEffect 최상단 - ${format(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS')}`);
                (async () => {
                    try {
                        // 스타일 추가
                        ////////////////////////////////////////////////////////////////////

                        ////////////////////////////////////////////////////////////////////

                        const { Design } = await import(`./template/${window.CONSTANTS.get(`APP.THEME`)}/organ`);
                        setComponent( Design[actionName] );
                    } catch (error) {
                        console.error("Failed to load design component:", error);
                    }
                })();
            }, []);

            // 컴포넌트가 렌더링된 후에 버튼 이벤트 설정
            useEffect(() => {
                if (Component !== null && isLoaded === true) {
                    // console.log("Component", format(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS'));

                    // 콤포넌트 최초 로딩 후
                    ////////////////////////////////////////////////////////////////////
                    $(`.form-common-search-button`).off(`click`).on('click', function(e){
                        stopEvent(e);
                        if (fetchDataState.current === `ready`) {
                            $(`.form-common-search`)[0].dispatchEvent(new Event("submit", { bubbles: false, cancelable: false }));
                        }
                        else {
                            alert("데이타 조회중입니다. 잠시만 기다리세요");
                        }
                    });

                    $(`.form-common-search`).off(`submit`).on(`submit`, async function (e) {
                        stopEvent(e);
                        search(1);
                        return;
                    });
                    $(`.form-common-search`)[0].dispatchEvent(new Event("submit", { bubbles: false, cancelable: false }));

                    if (isLoaded === true) {
                        setIsLoaded(false);
                    }
                    // 콤포넌트가 언마운트 되거나, 재실행시 return 부분이 실행된다.
                    // 예외처리를 하더라도, 최초 등록이 됐다면 이후 조건에 상관없이 위 상황에서는 계속 실행된다.
                    return () => {
                        // $(`.form-common-search-button`).off(`click`);
                        // $(`.form-common-search`).off(`submit`);
                    };
                    ////////////////////////////////////////////////////////////////////
                }
            }, [isLoaded]); // DesignComponent가 로딩되면 이벤트 설정

            return CommonReturn(Component)({paramFetchData: fetchData, paramSearchFunc: search, paramCurrentPage: currentPage.current, paramItemsPerPage: itemsPerPage.current, paramPagesPerPage: pagesPerPage.current, totalCount: totalCount, pagingChange: pagingChange, onLoad: handleComponentLoad,});
        };
    },
};

export { Controller };
