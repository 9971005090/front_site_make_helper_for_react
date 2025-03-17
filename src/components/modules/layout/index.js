// src/components/modules/layout/index.js
import React from "react";
import { CommonReturn } from "../../../components/utils/common-return";

export const Layout = ({ url, onLastLoad }) => {
    console.log(":::::Layout, :::::", Date.getNow());
    console.log(":::::url, :::::", url);
    const [Component, setComponent] = React.useState(null);

    React.useEffect(() => {
        (async function() {
            const { Design } = await import(`./template/${window.CONSTANTS.get(`APP.THEME`)}/layout`);
            setComponent(Design.index);
        })();
    }, [url]);

    return CommonReturn(Component)({ uriParams: url, loadingTypeTitle: `layout`, onLastLoad: onLastLoad });
};