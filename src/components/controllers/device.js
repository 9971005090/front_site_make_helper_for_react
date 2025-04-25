// src/controllers/organ.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import $ from "cash-dom";
import { formSearchParser } from "../../utils/form-search-parser";
import { CommonReturn } from "../../components/utils/common-return";
import { UTIL as DEVICE_UTIL } from "../../utils/api/custom/device/index";
import { UTIL as ORGAN_UTIL } from "../../utils/api/custom/organ/index";
import { UTIL as WARD_UTIL } from "../../utils/api/custom/ward/index";
import { CONST as DEVICE_CONST } from "../../constants/device/constant";
import { Notify } from '../../utils/global-utils';
import { CustomSelectBoxAsync } from "../../components/utils/custom-select-box-async";
import { useVariable as useVariableNoRender } from "../../hooks/utils-no-render/variable";


import { RUN as ORGAN_FAKE_API_RUN } from "../../constants/fake-api/organ";

const Controller = {
    index: function() {
        return function({ url, onLastLoad, paramIsFirst = true }) {
            console.log(":::::Controller device - organ:::::", Date.getNow(), url.controller);
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
            const { get: getVariable, set: setVariable } = useVariableNoRender();
            // const [wardCode, setWardCode] = React.useState(null);
            const etc = React.useRef({
                organOptions: null,
                wardOptions: {
                    type: `ward`,
                    datas: null,
                    all: {code: `all`, title: `병동선택`, isUse: false},
                    default: null,
                    attr: {
                        name: `wardCode`,
                        'add-class': [`use-option`]
                    },
                    size: {
                        'width': 216,
                        'height': 32,
                        'margin-left': 10
                    },
                    callback: null
                }
            });
            const cBox = {
                organ: CustomSelectBoxAsync(),
                ward: CustomSelectBoxAsync()
            };

            const callbackForCustomSelectBoxOrgan = async function(choiceBox) {
                const choiceCode = choiceBox.attr(`data-code`);
                let _d = [];
                if (choiceCode !== null && choiceCode !== `all`) {
                    _d = await WARD_UTIL.LIST_FOR_PARSING({'organizationCode': choiceCode});
                }
                if ($(choiceBox).attr(`data-code`) !== `all`) {
                    $(`.btn-all-delete`).css(`display`, `block`);
                }
                else {
                    $(`.btn-all-delete`).css(`display`, `none`);
                }
                etc.current.wardOptions.datas = _d;
                // cBox.ward.run(`.select-box-parent-for-ward`, etc.current.wardOptions, getVariable(`DEVICE.PAGE.CUSTOM_SELECT_BOX_WARD.RESULT`));
                cBox.ward.run(`.select-box-parent-for-ward`, etc.current.wardOptions);
            };


            const setAddEvent = async function() {
                /////////////////////////////////////////////////////////////////////////////////////////////////////
                if (action === `index`) {
                    // 동적으로 처리를 안하면, 결국 이 콤포넌트가 리랜더링이 될 수 밖에 없는 구조라.. 그 최소한의 처리도 막기 위해 동적으로 처리
                    await cBox.organ.run(`.select-box-parent-for-organ`, etc.current.organOptions);
                    await cBox.ward.run(`.select-box-parent-for-ward`, etc.current.wardOptions);
                    isFirst.current = false;

                    (await import(`../../events/custom/device/index`)).event.index({search: search, fetchDataState: fetchDataState.current, navigate: navigate, currentPage: currentPage.current, wardData: getVariable(`PARSING_ORGANIZATIONS`)});

                    if (isFirstSearch.current === true) {
                        $(`.form-common-search`)[0].dispatchEvent(new Event("submit", { bubbles: false, cancelable: false }));
                        isFirstSearch.current = false;
                    }
                }
                else if (action === `add`) {
                    // 동적으로 처리를 안하면, 결국 이 콤포넌트가 리랜더링이 될 수 밖에 없는 구조라.. 그 최소한의 처리도 막기 위해 동적으로 처리
                    etc.current.organOptions.attr['add-class'] = [`check`];
                    etc.current.wardOptions.attr['add-class'] = [`check`];
                    await cBox.organ.run(`.select-box-parent-for-organ`, etc.current.organOptions);
                    await cBox.ward.run(`.select-box-parent-for-ward`, etc.current.wardOptions);
                    //setVariable(`DEVICE.PAGE.CUSTOM_SELECT_BOX_WARD.RESULT`, _r, true);

                    (await import(`../../events/custom/device/add`)).event({navigate: navigate});
                    (await import(`../../events/custom/common-cancel`)).event({controllerName: controller, navigate: navigate});
                }
                else if (action === `add-bulk`) {
                    // 동적으로 처리를 안하면, 결국 이 콤포넌트가 리랜더링이 될 수 밖에 없는 구조라.. 그 최소한의 처리도 막기 위해 동적으로 처리
                    etc.current.organOptions.attr['add-class'] = [`check`];
                    etc.current.wardOptions.attr['add-class'] = [`check`];
                    await cBox.organ.run(`.select-box-parent-for-organ`, etc.current.organOptions);
                    await cBox.ward.run(`.select-box-parent-for-ward`, etc.current.wardOptions);
                    // setVariable(`DEVICE.PAGE.CUSTOM_SELECT_BOX_WARD.RESULT`, _r, true);

                    (await import(`../../events/custom/device/add-bulk`)).event({navigate: navigate});
                    (await import(`../../events/custom/common-cancel`)).event({controllerName: controller, navigate: navigate});
                }

                /////////////////////////////////////////////////////////////////////////////////////////////////////
            };

            const search = async function(setPage = 1) {
                const { CommonFetchAsync } = await import(`../../components/modules/common-fetch-async/index`);
                const { PagingAsync } = await import(`../../components/modules/paging-async/index`);

                // setPage는 실시간으로 이용하고, 랜더링을 다시 하기 위해서는 useState를 사용한다. 불편하네.
                currentPage.current = setPage;
                const form = formSearchParser(`.form-common-search`);
                form.pageNumber = currentPage.current;
                form.count = itemsPerPage.current;
                fetchDataState.current = `searching`;
                const response = await DEVICE_UTIL.PAGE(form);
                if (response.result === true) {
                    if (response.deviceRegisterList !== null) {
                        for (let i = 0; i < response.deviceRegisterList.length; i++) {
                            response.deviceRegisterList[i] = DEVICE_UTIL.DATA_PARSING(response.deviceRegisterList[i]);
                        }
                    }
                    // 기존 콤포넌트 > 메모리 제거가 가끔 늦게 처리되는 경우가 있다.
                    // main.js 그래서 처리 시간 확보를 위해, 0.1초 지연 처리를 한다.
                    setTimeout(function() {
                        CommonFetchAsync.run(`#contents-by-data-table`, search, response, currentPage.current, controller, Date.getNow(), isFirst.current, navigate);
                        PagingAsync.run(`#pagination`, search, response.totalCount, currentPage.current, Date.getNow(), controller, isFirst.current);
                        fetchDataState.current = `ready`;
                        isFirst.current = false;
                    }, 100);

                }
                else if (getVariable(`APP.API.RESPONSE_CODE`).SESSION_CLOSED !== response.error) {
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
                        setVariable(`ORGANIZATIONS`, _t, true);
                        setVariable(`ORGANIZATION_DATAS`, _d, true);
                        setVariable(`PARSING_ORGANIZATIONS`, _p, true);

                        etc.current.organOptions = {
                            type: `organ`,
                            datas: _p,
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
                            callback: callbackForCustomSelectBoxOrgan
                        };

                        const { Design } = await import(`./template/${getVariable(`APP.THEME`)}/device`);
                        setComponent( Design[action] );

                    } catch (error) {
                        console.error("Failed to load design component:", error);
                    }
                })();
            }, []);

            return CommonReturn(Component)({ onLoad: setAddEvent, onLastLoad: onLastLoad, deviceConstant: DEVICE_CONST, THEME: getVariable(`APP.THEME`), etc: {organOptions: etc.current.organOptions, wardOptions: etc.current.wardOptions} });
        };
    },
};

export { Controller };