// src/controllers/organ.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import $ from "cash-dom";
import { formSearchParser } from "../../utils/form-search-parser";
import { CommonReturn } from "../../components/utils/common-return";
import { UTIL as STATISTICS_UTIL } from "../../utils/api/custom/statistics/index";
import { UTIL as ORGAN_UTIL } from "../../utils/api/custom/organ/index";
import { UTIL as WARD_UTIL } from "../../utils/api/custom/ward/index";
import { CONST as DEVICE_CONST } from "../../constants/device/constant";
import { Notify } from '../../utils/global-utils';
import { CustomSelectBoxAsync } from "../../components/utils/custom-select-box-async";


import { RUN as ORGAN_FAKE_API_RUN } from "../../constants/fake-api/organ";

const Controller = {
    index: function() {
        return function({ url, onLastLoad, paramIsFirst = true }) {
            console.log(":::::Controller statistics - start:::::", Date.getNow(), url.controller);
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
            // const [wardCode, setWardCode] = React.useState(null);
            const etc = React.useRef({
                organOptions: {
                    type: `organ`,
                    datas: null,
                    all: {code: `all`, title: `기관선택`, isUse: false},
                    default: null,
                    attr: {
                        name: `targetOrganizationCode`,
                        'add-class': [`use-option`]
                    },
                    size: {
                        'width': 216,
                        'height': 32,
                        'margin-left': 0
                    },
                    callback: null
                }
            });
            const cBox = {
                organ: CustomSelectBoxAsync()
            };


            const setAddEvent = async function() {
                /////////////////////////////////////////////////////////////////////////////////////////////////////
                if (action === `index`) {
                    // 동적으로 처리를 안하면, 결국 이 콤포넌트가 리랜더링이 될 수 밖에 없는 구조라.. 그 최소한의 처리도 막기 위해 동적으로 처리
                    await cBox.organ.run(`.select-box-parent-for-organ`, etc.current.organOptions);
                    isFirst.current = false;

                    (await import(`../../events/custom/statistics/index`)).event.index({search: search, fetchDataState: fetchDataState.current, navigate: navigate, currentPage: currentPage.current, etc: etc, cBox: cBox});

                    if (isFirstSearch.current === true) {
                        $(`.form-common-search`)[0].dispatchEvent(new Event("submit", { bubbles: false, cancelable: false }));
                        isFirstSearch.current = false;
                    }
                }
                // else if (action === `day`) {
                //     (await import(`../../events/custom/statistics/day`)).event({navigate: navigate});
                // }
                /////////////////////////////////////////////////////////////////////////////////////////////////////
            };

            const search = async function(setPage = 1) {
                const { CommonFetchAsync } = await import(`../../components/modules/common-fetch-async/index`);

                // setPage는 실시간으로 이용하고, 랜더링을 다시 하기 위해서는 useState를 사용한다. 불편하네.
                currentPage.current = setPage;
                const form = formSearchParser(`.form-common-search`);

                form.pageNumber = currentPage.current;
                form.count = itemsPerPage.current;
                form.startDateTime = `${form.startDateTime} 00:00:00`;
                form.endDateTime = `${form.endDateTime} 23:59:59`;
                if (form.targetOrganizationCode !== null) {
                    form.targetOrganizationCodeList = [form.targetOrganizationCode];
                    delete form.targetOrganizationCode;
                }


                fetchDataState.current = `searching`;
                const response = await STATISTICS_UTIL.LIST(form);
                if (response.result === true) {
                    if (response.measurementPeriodCountList !== null) {
                        for (let i = 0; i < response.measurementPeriodCountList.length; i++) {
                            // response.measurementPeriodCountList[i] = STATISTICS_UTIL.DATA_PARSING(response.measurementPeriodCountList[i]);
                        }
                    }
                    // 기존 콤포넌트 > 메모리 제거가 가끔 늦게 처리되는 경우가 있다.
                    // main.js 그래서 처리 시간 확보를 위해, 0.1초 지연 처리를 한다.
                    setTimeout(function() {
                        CommonFetchAsync.run(`#contents-by-data-table`, search, response, currentPage.current, controller, Date.getNow(), isFirst.current, navigate);
                        fetchDataState.current = `ready`;
                        isFirst.current = false;
                    }, 100);

                }
                else if (window.CONSTANTS.get(`APP.API.RESPONSE_CODE`).SESSION_CLOSED !== response.error) {
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
                        const _t = await ORGAN_UTIL.LIST();
                        let _p = {};
                        let _d = [];
                        for (let i = 0; i < _t.organizationList.length; i++) {
                            _p[_t.organizationList[i].organizationCode] = _t.organizationList[i].organizationName;
                            _d.push({
                                code: _t.organizationList[i].organizationCode,
                                title: _t.organizationList[i].organizationName,
                            });
                        }
                        window.CONSTANTS.set(`ORGANIZATIONS`, _t, true);
                        window.CONSTANTS.set(`ORGANIZATION_DATAS`, _d, true);
                        window.CONSTANTS.set(`PARSING_ORGANIZATIONS`, _p, true);

                        etc.current.organOptions.datas = _p;

                        const { Design } = await import(`./template/${window.CONSTANTS.get(`APP.THEME`)}/statistics`);
                        setComponent( Design[action] );

                    } catch (error) {
                        console.error("Failed to load design component:", error);
                    }
                })();
            }, []);

            return CommonReturn(Component)({ onLoad: setAddEvent, onLastLoad: onLastLoad, THEME: window.CONSTANTS.get(`APP.THEME`), etc: {organOptions: etc.current.organOptions} });
        };
    },
};

export { Controller };