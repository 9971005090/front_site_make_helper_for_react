// src/controllers/organ.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import $ from "cash-dom";
import { formParser } from "../../utils/form-parser";
import { CommonReturn } from "../../components/utils/common-return";
import { UTIL as DEVICE_UTIL } from "../../utils/api/custom/device/index";
import { UTIL as ORGAN_UTIL } from "../../utils/api/custom/organ/index";
import { UTIL as WARD_UTIL } from "../../utils/api/custom/ward/index";
import { CONST as DEVICE_CONST } from "../../constants/device/constant";
import { Notify } from '../../utils/global-utils';
import { CustomSelectBoxAsync } from "../../components/utils/custom-select-box-async";


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
            const [wardCode, setWardCode] = React.useState(null);
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
                setWardCode(choiceCode);
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
                cBox.ward.run(`.select-box-parent-for-ward`, etc.current.wardOptions, isFirst.current, window.CONSTANTS.get(`DEVICE.PAGE.CUSTOM_SELECT_BOX.RESULT`));
            };


            const setAddEvent = async function() {
                /////////////////////////////////////////////////////////////////////////////////////////////////////
                if (action === `index`) {
                    // 동적으로 처리를 안하면, 결국 이 콤포넌트가 리랜더링이 될 수 밖에 없는 구조라.. 그 최소한의 처리도 막기 위해 동적으로 처
                    await cBox.organ.run(`.select-box-parent-for-organ`, etc.current.organOptions, isFirst.current);
                    const _r = await cBox.ward.run(`.select-box-parent-for-ward`, etc.current.wardOptions, isFirst.current);
                    window.CONSTANTS.set(`DEVICE.PAGE.CUSTOM_SELECT_BOX.RESULT`, _r, true);
                    isFirst.current = false;

                    (await import(`../../events/custom/device/index`)).event.index({search: search, fetchDataState: fetchDataState.current, navigate: navigate, currentPage: currentPage.current});

                    if (isFirstSearch.current === true) {
                        $(`.form-common-search`)[0].dispatchEvent(new Event("submit", { bubbles: false, cancelable: false }));
                        isFirstSearch.current = false;
                    }
                }
                // else if (action === `add`) {
                //     (await import(`../../events/custom/organ/add`)).event({navigate: navigate});
                //     (await import(`../../events/custom/common-cancel`)).event({controllerName: controller, navigate: navigate});
                // }
                // else if (action === `edit`) {
                //     (await import(`../../events/custom/organ/edit`)).event({navigate: navigate});
                //     (await import(`../../events/custom/common-cancel`)).event({controllerName: controller, navigate: navigate});
                // }

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
                const response = await DEVICE_UTIL.PAGE(parameter);
                if (response.result === true) {
                    CommonFetchAsync.run(`#contents-by-data-table`, search, response, currentPage.current, controller, Date.getNow(), isFirst.current, navigate);
                    PagingAsync.run(`#pagination`, search, response.totalCount, currentPage.current, Date.getNow(), isFirst.current);
                    fetchDataState.current = `ready`;
                    isFirst.current = false;
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

                        const { PagingAsync } = await import(`../../components/modules/paging-async/index`);

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

                        const { Design } = await import(`./template/${window.CONSTANTS.get(`APP.THEME`)}/device`);
                        // 수정일 경우에는 먼저 데이타 조회 하자.. 한번 해보자.
                        if (action === `edit`) {
                            const _goList = function() {
                                Notify(`top-center`, `잘못된 요청입니다.`, `error`);
                                navigate(`organ`);
                            };
                            if (String.isNullOrWhitespace(code) === false) {
                                const _t = await DEVICE_UTIL.SELECT(code);
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

            return CommonReturn(Component)({ onLoad: setAddEvent, onLastLoad: onLastLoad, organInfo: organInfo.current, deviceConstant: DEVICE_CONST, THEME: window.CONSTANTS.get(`APP.THEME`), etc: {organOptions: etc.current.organOptions, wardOptions: etc.current.wardOptions} });
        };
    },
};

export { Controller };