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
    INSERT_BULK: async function(params = null) {
        if (params === null) {
            return false;
        }
        const passingParams = UTIL._GET_ADD_PARAMS({}, params);
        const response = await POST(API.URL.INSERT_BULK, passingParams);
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
    DELETE_ALL: async function(params = null) {
        if (params === null) {
            return false;
        }
        const passingParams = UTIL._GET_ADD_PARAMS({}, params);
        const response = await POST(API.URL.DELETE_ALL, passingParams);
        return response;
    },
    UPDATE_ALL: async function(params = null) {
        if (params === null) {
            return false;
        }
        const passingParams = UTIL._GET_ADD_PARAMS({}, params);
        const response = await POST(API.URL.UPDATE_ALL, passingParams);
        return response;
    },
    _GET_ADD_PARAMS: function(params, addParams) {
        if (addParams !== null) {
            for (let key in addParams) {
                params[key] = addParams[key];
            }
        }
        return params;
    },
};
