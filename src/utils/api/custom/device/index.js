// src/utils/api/organ.js
import { API } from "../../../../constants/device/api";
import { POST } from "../../../../utils/axios-api";
import { CONST as DEVICE_CONST } from "../../../../constants/device/constant";

export const UTIL = {
    DATA_PARSING: function(data) {
        const _p = window.CONSTANTS.get(`PARSING_ORGANIZATIONS`);
        data.parsingType = DEVICE_CONST.TYPE.TITLE[data.deviceType];
        if (_p !== null) {
            data.parsingOrganization = Object.prototype.hasOwnProperty.call(_p, data.organizationCode) === true ? _p[data.organizationCode] : data.organizationCode;
        }
        return data;
    },
    // LIST: function(addParams = null) {
    //     const passingParams = {
    //         requester : GBL.ACCOUNT.INFO.userCode,
    //     }
    //     if (addParams !== null) {
    //         for (let key in addParams) {
    //             passingParams[key] = addParams[key]
    //         }
    //     }
    //     const response = POST(API.URL.SELECT_LIST, passingParams);
    //     return response;
    // },
    PAGE: async function(addParams = null) {
        const passingParams = {
            "count": 100,
        };
        if (addParams !== null) {
            for (let key in addParams) {
                passingParams[key] = addParams[key];
            }
        }
        const response = await POST(API.URL.PAGE, passingParams, {});
        return response;
    },
    // SELECT_SIMPLE_PAGE: function(addParams = null) {
    //     const passingParams = {
    //         requester : GBL.ACCOUNT.INFO.userCode,
    //         "organizationCode": GBL.ACCOUNT.INFO.organizationCode,
    //         "pageNumber": 1,
    //         "count": 100
    //     }
    //     if (addParams !== null) {
    //         for (let key in addParams) {
    //             passingParams[key] = addParams[key]
    //         }
    //     }
    //     const response = POST(API.URL.SELECT_SIMPLE_PAGE, passingParams);
    //     return response;
    // },
    SELECT: async function(code = null) {
        if (code === null) {
            return false;
        }
        const passingParams = {
            organizationCode: code,
        };
        const response = await POST(API.URL.SELECT, passingParams);
        return response;
    },
    // SELECT_LIST: function(code = null) {
    //     if (code === null) {
    //         return false;
    //     }
    //     const passingParams = {
    //         requester : GBL.ACCOUNT.INFO.userCode,
    //         search: code,
    //     }
    //     const response = POST(API.URL.SELECT_LIST, passingParams);
    //     return response;
    // },
    DELETE: async function(code = null) {
        if (code === null) {
            return false;
        }
        const passingParams = {
            serialNumber: code
        };
        const response = await POST(API.URL.DELETE, passingParams);
        return response;
    },
    INSERT: async function(addParams = null) {
        const passingParams = {};
        if (addParams !== null) {
            for (let key in addParams) {
                passingParams[key] = addParams[key];
            }
        }
        if (String.isNullOrWhitespace(passingParams.measurementDate) === true) {
            passingParams.measurementDate = 15;
        }
        const response = await POST(API.URL.INSERT, passingParams);
        return response;
    },
    UPDATE: function(addParams=null) {
        const passingParams = {};
        if (addParams !== null) {
            for (let key in addParams) {
                passingParams[key] = addParams[key];
            }
        }
        const response = POST(API.URL.UPDATE, passingParams);
        return response;
    },
    UPDATE_EXPIRATION_LIST: async function(addParams=null) {
        const passingParams = {};
        if (addParams !== null) {
            for (let key in addParams) {
                passingParams[key] = addParams[key];
            }
        }
        const response = await POST(API.URL.UPDATE_EXPIRATION_LIST, passingParams);
        return response;
    }
    // DELETE_ALERT: function(callbackFunction= null, param=null, callbackFunctionSearch = null, pathName=null, search='search', text="삭제"){
    //     const modalId = "customAlertPushDelete";
    //     const okBtnCallback = function () {
    //         const response = callbackFunction(param);
    //         if (response.result === true) {
    //             custom.etc.customToastForColor(`정상적으로 ${text}됐습니다.`);
    //         }
    //         else {
    //             custom.etc.customToastForColor(`${text}에 실패했습니다. 잠시 후 다시 시도하세요.`, `bgRed`);
    //         }
    //         modal.globalClose(modalId);
    //         callbackFunctionSearch(search, pathName);
    //     }
    //
    //     const cancelBtnCallback = function () {
    //         modal.globalClose(modalId);
    //     }
    //     let initParameter = {
    //         msg: `<p class="customAlertText">정말 ${text} 하시겠습니까?</p>`,
    //         id: modalId,
    //         isBackgroundClickForClose: false,
    //         button: {
    //             cancel: {
    //                 callback :[{ name: cancelBtnCallback, params: [] }]
    //             },
    //             ok : {
    //                 callback :[{ name: okBtnCallback, params: [] }]
    //             },
    //             del: {
    //                 isUse: false
    //             }
    //         }
    //     }
    //     Seers.Loader.moduleLoad("custom-alert", "index", initParameter);
    // },
};
