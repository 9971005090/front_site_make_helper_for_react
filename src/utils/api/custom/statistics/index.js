// src/utils/api/organ.js
import { API } from "../../../../constants/statistics/api";
import { POST } from "../../../../utils/axios-api";
import { CONST as STATISTICS_CONST } from "../../../../constants/statistics/constant";
import { CONST as MEASUREMENT_CONST } from "../../../../constants/measurement/constant";

export const UTIL = {
    LIST: async function(params = null) {
        const passingParams = UTIL._GET_ADD_PARAMS({
            'periodCountType': STATISTICS_CONST.SEARCH_TYPE.IS_COUNT_ZERO_USE.IS_FALSE,
            'measurementStatusList': [MEASUREMENT_CONST.STATUS.CODE.RECODING_START, MEASUREMENT_CONST.STATUS.CODE.RECODING_END]
        }, params);
        const response = await POST(API.URL.SELECT, passingParams);
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
