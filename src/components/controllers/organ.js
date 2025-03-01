// src/controllers/organ.js
import React, { useEffect } from "react";
import $ from "cash-dom";
import { format } from 'date-fns';
import { useAuth } from "../../hooks/auth";
import stopEvent from "../../utils/stopEvent";
import {post} from "../../utils/axiosApi";
import addParams from "../../utils/custom/addParams";
import formParser from "../../utils/formParser";


const Controller = {
    index: () => {
        // 디자인 컴포넌트를 반환
        return ({ getParams }) => {
            const { controllerName, actionName } = getParams;
            const { isAuthenticated, cookieId } = useAuth();
            const [Component, setComponent] = React.useState(null);
            const [fetchData, setFetchData] = React.useState(null);
            const fetchDataState = React.useRef("ready"); // ready, searching
            const itemsPerPage = React.useRef(10);
            const pagesPerPage = React.useRef(10);
            const currentPage = React.useRef(1);
            const search = async function(setPage = 1) {
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
                    fetchDataState.current = `ready`;
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
                if (Component !== null) {
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
                        search();
                        // const form = formParser(`.form-common-search`);
                        // const parameter = {
                        //     'search': form['search'],
                        //     'pageNumber': 1,
                        //     'count': 10,
                        //     'expiration': form['expiration'],
                        // };
                        // fetchDataState.current = `searching`;
                        // const response = await post(`${window.CONSTANTS.get(`APP.API_BASE`)}/Manager/SelectOrganizationPage`, addParams(parameter, form), {});
                        // if (response.result === true) {
                        //     setFetchData(response);
                        //     fetchDataState.current = `ready`;
                        // }
                        // else {
                        //     alert(`데이타 조회 실패`);
                        //     fetchDataState.current = `ready`;
                        // }
                        return;
                    });
                    $(`.form-common-search`)[0].dispatchEvent(new Event("submit", { bubbles: false, cancelable: false }));

                    return () => {
                        // $(`.logout-button`).off(`click`);
                        // $(`.cm-header .cm-top-menu-ul .menu-list`).off(`click`);
                    };
                    ////////////////////////////////////////////////////////////////////
                }
            }, [Component]); // DesignComponent가 로딩되면 이벤트 설정

            // 로딩 중 표시
            if (Component === null) {
                return <>Design Loading...</>;
            }
            console.log("currentPage.current::::", currentPage.current);
            return <Component paramFetchData={fetchData} paramSearchFunc={search} paramCurrentPage={currentPage.current} paramItemsPerPage={itemsPerPage.current} paramPagesPerPage={pagesPerPage.current} />;
        };
    },
};

export { Controller };
