// src/controllers/organ.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import $ from "cash-dom";
import { format } from 'date-fns';
import { formParser } from "../../utils/form-parser";
import { CommonReturn } from "../../components/utils/common-return";
import { CommonFetchAsync } from '../../components/modules/common-fetch-async/index';
import { PagingAsync } from '../../components/modules/paging-async/index';

import { UTIL as ORGAN_UTIL } from "../../utils/api/organ";
import { Notify } from '../../utils/global-utils';

// window.CONSTANTS.set(`APP.CHECK_ROOT`, [CommonFetchAsync, PagingAsync], true);
const Controller = {
    index: function() {
        return ({ uriParams, onLastLoad, paramIsFirst = true }) => {
            console.log(":::::Controller organ start:::::", Date.getNow());
            const location = useLocation();
            const queryParams = new URLSearchParams(location.search);
            const code = queryParams.get(`code`);
            console.log("code:::", code);
            const { controller, action } = uriParams;
            const [Component, setComponent] = React.useState(null);
            const [isLoaded, setIsLoaded] = React.useState({
                parent: false,
                child: false
            });
            const fetchDataState = React.useRef("ready"); // ready, searching
            const itemsPerPage = React.useRef(10);
            const pagesPerPage = React.useRef(10);
            const currentPage = React.useRef(1);
            const isFirstSearch = React.useRef(true);
            const organInfo = React.useRef(null);
            const isFirst = React.useRef(paramIsFirst);
            const navigate = useNavigate();


            const onLoadParent = () => {
                setIsLoaded((state) => {
                    return {
                        parent: true,
                        child: state.child
                    };
                });
            };
            const onLoadChild = () => {
                setIsLoaded((state) => {
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
                const response = await ORGAN_UTIL.PAGE(parameter);
                if (response.result === true) {
                    CommonFetchAsync.run(`#contents-by-data-table`, search, response, currentPage.current, `organ`, Date.getNow(), isFirst.current, navigate);
                    PagingAsync.run(`#pagination`, search, response.totalCount, currentPage.current, Date.getNow(), isFirst.current);
                    fetchDataState.current = `ready`;
                    isFirst.current = false;
                }
                else {
                    Notify(`top-center`, `데이타 조회 실패`, `error`);
                    fetchDataState.current = `ready`;
                }
            };


            React.useEffect(() => {
                // console.log(`useEffect 최상단 - ${format(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS')}`);
                (async () => {
                    try {
                        // CommonFetchAsync.close();
                        // PagingAsync.close();
                        // 스타일 추가
                        ////////////////////////////////////////////////////////////////////

                        ////////////////////////////////////////////////////////////////////

                        const { Design } = await import(`./template/${window.CONSTANTS.get(`APP.THEME`)}/organ`);
                        // 수정일 경우에는 먼저 데이타 조회 하자.. 한번 해보자.
                        if (action === `edit`) {
                            const _goList = function() {
                                Notify(`top-center`, `잘못된 요청입니다.`, `error`);
                                navigate(`organ`);
                            };
                            if (String.isNullOrWhitespace(code) === false) {
                                const _t = await ORGAN_UTIL.SELECT(code);
                                if (_t.result === true) {
                                    if (_t.organization === null) {
                                        _goList();
                                        return;
                                    }
                                    organInfo.current = _t.organization;
                                }
                                else {
                                    _goList();
                                    return;
                                }
                                console.log("_t::::", _t);
                            }
                        }
                        setComponent( Design[action] );
                    } catch (error) {
                        console.error("Failed to load design component:", error);
                    }
                })();
            }, []);

            // 컴포넌트가 렌더링된 후에 버튼 이벤트 설정
            React.useEffect(() => {
                if (Component !== null && isLoaded.parent === true) {
                    ////////////////////////////////////////////////////////////////////
                    // 현재까지는 일단 이벤트 적용을 계속 실행하자.. 데이타가 검색되기 전에는 아래고, 검색된 후에는 다른걸 해야하는데.
                    // 현 구조에서는 이게 안된다.
                    // 이벤트 등록은 성능에 문제가 안되니 일단 진행해보자.

                    if (action === `index`) {
                        (async function() {
                            try {
                                ////////////////////////////////////////////////////////////////////
                                // 유지 보수를 위해, 파일로 빼지만, 사용하는 함수나 state 등은 모두 파라미터로 보낸다.
                                (await import(`../../events/custom/organ/index`)).event.index({search: search, fetchDataState: fetchDataState, navigate: navigate, currentPage: currentPage.current, callbackFunc: ORGAN_UTIL.UPDATE_EXPIRATION_LIST});

                                if (isFirstSearch.current === true) {
                                    $(`.form-common-search`)[0].dispatchEvent(new Event("submit", { bubbles: false, cancelable: false }));
                                    isFirstSearch.current = false;
                                }
                                ////////////////////////////////////////////////////////////////////

                            } catch (error) {
                                console.error("Failed to load design component:", error);
                            }
                        })();
                    }
                    else if (action === `add`) {
                        (async function() {
                            try {
                                ////////////////////////////////////////////////////////////////////
                                (await import(`../../events/custom/organ/add`)).event({navigate: navigate});
                                ////////////////////////////////////////////////////////////////////

                            } catch (error) {
                                console.error("Failed to load design component:", error);
                            }
                        })();
                    }
                    else if (action === `edit`) {
                        (async function() {
                            try {
                                ////////////////////////////////////////////////////////////////////
                                (await import(`../../events/custom/organ/edit`)).event({navigate: navigate});
                                ////////////////////////////////////////////////////////////////////

                            } catch (error) {
                                console.error("Failed to load design component:", error);
                            }
                        })();
                    }
                    if (isLoaded.parent === true) {
                        setIsLoaded((state) => {
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
            }, [isLoaded.parent]);


            // 컴포넌트가 렌더링된 후에 버튼 이벤트 설정
            React.useEffect(() => {
                if (Component !== null && isLoaded.child === true) {
                    ////////////////////////////////////////////////////////////////////
                    // 현재까지는 일단 이벤트 적용을 계속 실행하자.. 데이타가 검색되기 전에는 아래고, 검색된 후에는 다른걸 해야하는데.
                    // 현 구조에서는 이게 안된다.
                    // 이벤트 등록은 성능에 문제가 안되니 일단 진행해보자.
                    if (action === `index`) {
                        (async function() {
                            try {
                                ////////////////////////////////////////////////////////////////////
                                // 유지 보수를 위해, 파일로 빼지만, 사용하는 함수나 state 등은 모두 파라미터로 보낸다.
                                (await import(`../../events/custom/organ/index`)).event.datas({search: search, currentPage: currentPage.current, callbackFunc: ORGAN_UTIL.UPDATE_EXPIRATION_LIST});
                                ////////////////////////////////////////////////////////////////////

                            } catch (error) {
                                console.error("Failed to load design component:", error);
                            }
                        })();
                    }
                    if (isLoaded.child === true) {
                        setIsLoaded((state) => {
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
            }, [isLoaded.child]);

            return CommonReturn(Component)({paramSearchFunc: search, paramCurrentPage: currentPage.current, paramItemsPerPage: itemsPerPage.current, paramPagesPerPage: pagesPerPage.current, onLoadParent: onLoadParent, onLoadChild: onLoadChild, onLastLoad: onLastLoad, organInfo: organInfo.current});
        };
    },
};

export { Controller };
