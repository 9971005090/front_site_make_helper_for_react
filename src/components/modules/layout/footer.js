// src/layout/Footer.js
import React from "react";
import { CommonReturn } from "../../../components/utils/common-return";
export const Footer = () => {
    const [Component, setComponent] = React.useState(null);

    React.useEffect(() => {
        (async () => {
            const { Design } = await import(`./template/${window.CONSTANTS.get(`APP.THEME`)}/footer`);
            setComponent(Design.index);
        })();
    }, []);

    return CommonReturn(Component)({ loadingTypeTitle: `layout(footer)` });
};