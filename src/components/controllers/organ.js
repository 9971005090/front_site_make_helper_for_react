// src/controllers/organ.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import $ from "cash-dom";
import { formParser } from "../../utils/form-parser";
import { CommonReturn } from "../../components/utils/common-return";
import { UTIL as ORGAN_UTIL } from "../../utils/api/custom/organ/index";
import { Notify } from '../../utils/global-utils';

import { RUN as ORGAN_FAKE_API_RUN } from "../../constants/fake-api/organ";

const Controller = {
    index: function() {
        return function({ url, onLastLoad, paramIsFirst = true }) {
            // ORGAN_FAKE_API_RUN();
            const location = useLocation();
            const queryParams = new URLSearchParams(location.search);
            const code = queryParams.get(`code`);
            const { controller, action } = url;
            const [Component, setComponent] = React.useState(null);
            const fetchDataState = React.useRef("ready"); // ready, searching
            const itemsPerPage = React.useRef(10);
            const pagesPerPage = React.useRef(10);
            const currentPage = React.useRef(1);
            const isFirstSearch = React.useRef(true);
            const organInfo = React.useRef(null);
            const isFirst = React.useRef(paramIsFirst);
            const navigate = useNavigate();


            const setAddEvent = async function() {
                /////////////////////////////////////////////////////////////////////////////////////////////////////
                if (action === `index`) {
                    (await import(`../../events/custom/organ/index`)).event.index({search: search, fetchDataState: fetchDataState.current, navigate: navigate, currentPage: currentPage.current});

                    if (isFirstSearch.current === true) {
                        $(`.form-common-search`)[0].dispatchEvent(new Event("submit", { bubbles: false, cancelable: false }));
                        isFirstSearch.current = false;
                    }
                }
                else if (action === `add`) {
                    (await import(`../../events/custom/organ/add`)).event({navigate: navigate});
                    (await import(`../../events/custom/common-cancel`)).event({controllerName: controller, navigate: navigate});
                }
                else if (action === `edit`) {
                    (await import(`../../events/custom/organ/edit`)).event({navigate: navigate});
                    (await import(`../../events/custom/common-cancel`)).event({controllerName: controller, navigate: navigate});
                }
                /////////////////////////////////////////////////////////////////////////////////////////////////////
            };

            const search = async function(setPage = 1) {
                const { CommonFetchAsync } = await import(`../../components/modules/common-fetch-async/index`);
                const { PagingAsync } = await import(`../../components/modules/paging-async/index`);

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
                    CommonFetchAsync.run(`#contents-by-data-table`, search, response, currentPage.current, controller, Date.getNow(), isFirst.current, navigate);
                    PagingAsync.run(`#pagination`, search, response.totalCount, currentPage.current, Date.getNow(), isFirst.current);
                    fetchDataState.current = `ready`;
                    isFirst.current = false;
                }
                else {
                    Notify(`top-center`, `데이타 조회 실패`, `error`);
                    fetchDataState.current = `ready`;
                }
            };

            React.useEffect(function() {
                // console.log(`useEffect 최상단 - ${format(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS')}`);
                (async function() {
                    try {
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
                            }
                        }
                        setComponent( Design[action] );

                    } catch (error) {
                        console.error("Failed to load design component:", error);
                    }
                })();
            }, []);

            return CommonReturn(Component)({ onLoad: setAddEvent, onLastLoad: onLastLoad, organInfo: organInfo.current });
        };
    },
};

export { Controller };