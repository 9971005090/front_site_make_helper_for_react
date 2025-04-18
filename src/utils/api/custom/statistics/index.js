// src/utils/api/organ.js
import { API } from "../../../../constants/statistics/api";
import { POST } from "../../../../utils/axios-api";
import { CONST as STATISTICS_CONST } from "../../../../constants/statistics/constant";
import { CONST as MEASUREMENT_CONST } from "../../../../constants/measurement/constant";
import { format } from 'date-fns';

export const UTIL = {
    DATA_PARSING: function(data) {
        data.parsingDate = format(new Date(data.date), `yy-MM-dd`);
        return data;
    },
    LIST: async function(params = null) {
        const passingParams = UTIL._GET_ADD_PARAMS({
            'periodCountType': STATISTICS_CONST.SEARCH_TYPE.IS_COUNT_ZERO_USE.IS_FALSE,
            'measurementStatusList': [MEASUREMENT_CONST.STATUS.CODE.RECODING_START, MEASUREMENT_CONST.STATUS.CODE.RECODING_END]
        }, params);
        const response = await POST(API.URL.SELECT, passingParams);
        return response;
    },
    LIST_FOR_DAY: async function(params = null) {
        const passingParams = UTIL._GET_ADD_PARAMS({
            'order': `ASC`,
            'measurementStatusList': [MEASUREMENT_CONST.STATUS.CODE.RECODING_START, MEASUREMENT_CONST.STATUS.CODE.RECODING_END]
        }, params);
        const response = await POST(API.URL.SELECT_FOR_DAY, passingParams);
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
