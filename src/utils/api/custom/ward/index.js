// src/utils/api/custom/ward.js
import { API } from "../../../../constants/ward/api";
import { POST } from "../../../../utils/axios-api";
// import addParams from "../custom/addParams";

export const UTIL = {
    LIST_FOR_PARSING: async function(addParams = null) {
        let result = [];
        const passingParams = {
            includeSickRoom: false,
            includeSickBed: false
        };
        if (addParams !== null) {
            for (let key in addParams) {
                passingParams[key] = addParams[key];
            }
        }
        const response = await POST(API.URL.SELECT, passingParams);
        if(response.wardList !== null) {
            if(response.wardList.length > 0) {
                for(let i = 0; i < response.wardList.length; i++) {
                    result[response.wardList[i].wardCode] = response.wardList[i].ward;
                }
            }
        }
        return result;
    }
};
