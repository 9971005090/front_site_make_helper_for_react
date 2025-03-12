// src/components/modules/common-fetch/index.js
import React from "react";
import $ from "cash-dom";
import { CommonReturn } from "../../../components/utils/common-return";

export const CommonFetch = ({paramFetchData, paramType, onLoadChild}) => {
    const [Component, setComponent] = React.useState(null);

    React.useEffect(() => {
        (async () => {
            const { Design } = await import(`./template/${window.CONSTANTS.get(`APP.THEME`)}/${paramType}`);
            setComponent(Design.index);
        })();
    }, []);

    // React.useEffect(() => {
    //     if (Component !== null) {
    //         // 콤포넌트 최초 로딩 후
    //         ////////////////////////////////////////////////////////////////////
    //
    //         ////////////////////////////////////////////////////////////////////
    //     }
    //     return () => {
    //         // $(`.btn-delete`).off(`click`);
    //     };
    // }, []);

    return CommonReturn(Component)({ paramFetchData: paramFetchData, loadingTypeTitle: `common-fetch`, onLoadChild: onLoadChild });
};


