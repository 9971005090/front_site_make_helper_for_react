// src/utils/api/custom/check.js

import { Notify } from '../../../../utils/global-utils';
import { CONST as DEVICE_CONST } from "../../../../constants/device/constant";
import { UTIL as DEVICE_COMMON_UTIL } from "../../../../utils/api/custom/device/common";
import { UTIL as DEVICE_UTIL } from "../../../../utils/api/custom/device/index";
import { useVariable as useVariableNoRender } from "../../../../hooks/utils-no-render/variable";
const { get: getVariable } = useVariableNoRender();

export const UTIL = {
    GET_MACADDRESS: function(type = DEVICE_CONST.TYPE.CODE.ECG, value) {
        if(type == DEVICE_CONST.TYPE.CODE.ECG) {
            return `${DEVICE_CONST.PREFIX_ADDRESS.ECG}${DEVICE_COMMON_UTIL.DECIMAL_TO_HEXADECIMAL(value)}`;
        }
        else if(type == DEVICE_CONST.TYPE.CODE.TEMPERATURE) {
            return `${DEVICE_CONST.PREFIX_ADDRESS.TEMPERATURE}${DEVICE_COMMON_UTIL.DECIMAL_TO_HEXADECIMAL(value)}`;
        }
        else if(type == DEVICE_CONST.TYPE.CODE.TAG) {
            return `${DEVICE_CONST.PREFIX_ADDRESS.TAG}${DEVICE_COMMON_UTIL.DECIMAL_TO_HEXADECIMAL(value)}`;
        }
        else if(type == DEVICE_CONST.TYPE.CODE.SPO2) {
            return `${DEVICE_CONST.PREFIX_ADDRESS.SPO2}${DEVICE_COMMON_UTIL.DECIMAL_TO_HEXADECIMAL(value)}`;
        }
        else if(type == DEVICE_CONST.TYPE.CODE.BP) {
            return `${DEVICE_CONST.PREFIX_ADDRESS.BP}${DEVICE_COMMON_UTIL.DECIMAL_TO_HEXADECIMAL(value)}`;
        }
    },
    SERIAL: function (data = null) {
        let passingParams = null;
        if (data === null) {
            passingParams = {
                result: false,
                msg : `유효하지 않은 시리얼번호 입니다.\n알파벳 A,C,P 와 숫자6자리로 구성된 시리얼 번호를 확인해주세요`
            };
            return passingParams;
        }
        else {
            const regex = /^[APCE]\d{6}$/;
            if (regex.test(data) === false) {
                passingParams = {
                    result: false,
                    msg : `유효하지 않은 시리얼번호 입니다.\n알파벳 A,C,P 와 숫자6자리로 구성된 시리얼 번호를 확인해주세요`
                };
            }
            else {
                let deviceType = data[0] === "A" ? 1 : (data[0] === "P" ? 3 : (data[0] === "C" ? 2 : (data[0] === "E" ? 6 : 0)));
                let serialNumberForNumber = data.replace(/\D/g, '');
                passingParams = {
                    "result": true,
                    "deviceTypeName": data[0],
                    "deviceType": deviceType,
                    "serialNumber": data,
                    "serialFullNumber": data,
                    "serialNumberForNumber": serialNumberForNumber,
                    "macAddress": UTIL.GET_MACADDRESS(deviceType, Number(serialNumberForNumber))
                };
            }
            return passingParams;
        }
    },

    DUPLICATE: async function(params = null, notify = {isUse: false, msg: null}) {
        if(params === false){
            return false;
        }
        let message = null;
        let searchParams = {
            search: params.serialNumber,
            pageNumber: 1,
            count: 999
        };
        let _t = await DEVICE_UTIL.PAGE(searchParams);
        if (_t.result === true && _t.deviceRegisterList !== null && _t.deviceRegisterList.length > 0) {
            message = `${getVariable(`PARSING_ORGANIZATIONS`)[_t.deviceRegisterList[0].organizationCode]} 기관에 등록된 시리얼 번호입니다.`;
        }
        if (message === null) {
            return true;
        }
        else {
            if (notify.isUse === true) {
                if (notify.msg !== null) {
                    message = notify.msg;
                }
            }
            Notify(`top-center`, message, `error`);
            return false;
        }
    }
};
