// src/controllers/commonFetch.js
import React, { Suspense } from "react";
import $ from "cash-dom";

import stopEvent from "../../../utils/stopEvent";
import {post} from "../../../utils/axiosApi";
import addParams from "../../../utils/custom/addParams";

export const CommonFetch = ({paramFetchData, paramType, paramSearchFunc, paramCurrentPage}) => {
    const [Component, setComponent] = React.useState(null);

    React.useEffect(() => {
        (async () => {
            const { Design } = await import(`./template/${window.CONSTANTS.get(`APP.THEME`)}/${paramType}`);
            setComponent(Design.index);
        })();
    }, []);

    React.useEffect(() => {
        if (Component !== null) {
            // 콤포넌트 최초 로딩 후
            ////////////////////////////////////////////////////////////////////
            $(`.btn-delete`).off(`click`).on(`click`, async function (e) {
                stopEvent(e);
                const parameter = {
                    'organizationCodeList': [],
                };
                parameter.organizationCodeList.push($(this).parents('.cm-tr').attr('data-code'));
                if(Number($(`.radio-input[name="expiration"]:checked`).val()) === 0) {
                    parameter["expiration"] = 1;
                }
                else {
                    parameter['expiration'] = 0;
                }

                const response = await post(`${window.CONSTANTS.get(`APP.API_BASE`)}/Manager/UpdateOrganizationExpirationList`, parameter, {});
                if (response.result === true) {
                    paramSearchFunc(paramCurrentPage);
                }
                else {
                    alert(`데이타 업데이트 실패`);
                }
                // CUSTOM_UTIL.DELETE_ALERT(ORGAN_UTIL.UPDATE_EXPIRATION_LIST, parameter, _search, null, null, text);

            });
            ////////////////////////////////////////////////////////////////////
        }
        return () => {
            $(`.btn-delete`).off(`click`);
        };
    }, [Component, paramFetchData]);

    return (
        <Suspense fallback={<div>CommonFetch Loading...</div>}>
            {Component ? <Component paramFetchData={paramFetchData} /> : <p>Data Loading...</p>}
        </Suspense>
    );
};


