// src/components/modules/layout/index.js
import React from "react";
import { CommonReturn } from "../../../components/utils/common-return";

export const Layout = function({ url, onLastLoad }) {
    const [Component, setComponent] = React.useState(null);

    React.useEffect(function() {
        (async function() {
            const { Design } = await import(`./template/${window.CONSTANTS.get(`APP.THEME`)}/layout`);
            setComponent(Design.index);
        })();
    }, [url]);

    return CommonReturn(Component)({ uriParams: url, loadingTypeTitle: `layout`, onLastLoad: onLastLoad });
};