// src/controllers/organ.js
import React, {useEffect, useState} from "react";
import $ from "cash-dom";
import { format } from 'date-fns';
import { useAuth } from "../../hooks/auth";
import stopEvent from "../../utils/stopEvent";
import { post } from "../../utils/axiosApi";
import addParams from "../../utils/custom/addParams";
import formParser from "../../utils/formParser";
import { CommonReturn } from "../../components/utils/common-return";
import { event as eventOrgan } from "../../events/controllers/organ";

const Controller = {
    index: () => {
        return ({ uriParams }) => {
            const { controllerName, actionName } = uriParams;
            const [Component, setComponent] = React.useState(null);
            const [fetchData, setFetchData] = React.useState(null);
            const [isLoaded2, setIsLoaded2] = useState({
                parent: false,
                child: false
            });
            const fetchDataState = React.useRef("ready"); // ready, searching
            const itemsPerPage = React.useRef(10);
            const pagesPerPage = React.useRef(10);
            const currentPage = React.useRef(1);
            const isFirstSearch = React.useRef(true);

            const onLoadParent = () => {
                setIsLoaded2((state) => {
                    return {
                        parent: true,
                        child: state.child
                    };
                });
            };
            const onLoadChild = () => {
                setIsLoaded2((state) => {
                    return {
                        parent: state.parent,
                        child: true
                    };
                });
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
                if (Component !== null && isLoaded2.parent === true) {
                    ////////////////////////////////////////////////////////////////////
                    // 현재까지는 일단 이벤트 적용을 계속 실행하자.. 데이타가 검색되기 전에는 아래고, 검색된 후에는 다른걸 해야하는데.
                    // 현 구조에서는 이게 안된다.
                    // 이벤트 등록은 성능에 문제가 안되니 일단 진행해보자.
                    if (actionName === `index`) {
                        eventOrgan.index(search, fetchDataState, currentPage.current); // 유지 보수를 위해, 파일로 빼지만, 사용하는 함수나 state 등은 모두 파라미터로 보낸다.
                        if (isFirstSearch.current === true) {
                            $(`.form-common-search`)[0].dispatchEvent(new Event("submit", { bubbles: false, cancelable: false }));
                            isFirstSearch.current = false;
                        }
                    }
                    if (isLoaded2.parent === true) {
                        setIsLoaded2((state) => {
                            return {
                                parent: false,
                                child: state.child
                            };
                        });
                    }
                    // 콤포넌트가 언마운트 되거나, 재실행시 return 부분이 실행된다.
                    // 예외처리를 하더라도, 최초 등록이 됐다면 이후 조건에 상관없이 위 상황에서는 계속 실행된다.
                    return () => {
                        // $(`.form-common-search-button`).off(`click`);
                        // $(`.form-common-search`).off(`submit`);
                    };
                    ////////////////////////////////////////////////////////////////////
                }
            }, [isLoaded2.parent]);


            // 컴포넌트가 렌더링된 후에 버튼 이벤트 설정
            useEffect(() => {
                if (Component !== null && isLoaded2.child === true) {
                    ////////////////////////////////////////////////////////////////////
                    // 현재까지는 일단 이벤트 적용을 계속 실행하자.. 데이타가 검색되기 전에는 아래고, 검색된 후에는 다른걸 해야하는데.
                    // 현 구조에서는 이게 안된다.
                    // 이벤트 등록은 성능에 문제가 안되니 일단 진행해보자.
                    if (actionName === `index`) {
                        eventOrgan.datas(search, currentPage.current); // 유지 보수를 위해, 파일로 빼지만, 사용하는 함수나 state 등은 모두 파라미터로 보낸다.
                    }
                    if (isLoaded2.child === true) {
                        setIsLoaded2((state) => {
                            return {
                                parent: state.parent,
                                child: false
                            };
                        });
                    }
                    // 콤포넌트가 언마운트 되거나, 재실행시 return 부분이 실행된다.
                    // 예외처리를 하더라도, 최초 등록이 됐다면 이후 조건에 상관없이 위 상황에서는 계속 실행된다.
                    return () => {
                        // $(`.form-common-search-button`).off(`click`);
                        // $(`.form-common-search`).off(`submit`);
                    };
                    ////////////////////////////////////////////////////////////////////
                }
            }, [isLoaded2.child]);

            return CommonReturn(Component)({paramFetchData: fetchData, paramSearchFunc: search, paramCurrentPage: currentPage.current, paramItemsPerPage: itemsPerPage.current, paramPagesPerPage: pagesPerPage.current, onLoadParent: onLoadParent, onLoadChild: onLoadChild});
        };
    },
};

export { Controller };
