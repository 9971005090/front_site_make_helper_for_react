// src/layout/Left.js
import React from "react";
import { CommonReturn } from "../../../components/utils/common-return";
export const Left = () => {
    const [Component, setComponent] = React.useState(null);

    React.useEffect(() => {
        (async () => {
            const { Design } = await import(`./template/${window.CONSTANTS.get(`APP.THEME`)}/left`);
            setComponent(Design.index);
        })();
    }, []);

    return CommonReturn(Component)({ loadingTypeTitle: `layout(left)` });
};