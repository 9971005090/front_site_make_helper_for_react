// src/components/modules/layout/footer.js
import React from "react";
import { CommonReturn } from "../../../components/utils/common-return";

const Footer = function({ url }) {
    console.log(":::::module > layout > Footer:::::", Date.getNow());
    const [Component, setComponent] = React.useState(null);

    React.useEffect(function() {
        (async function() {
            const { Design } = await import(`./template/${window.CONSTANTS.get(`APP.THEME`)}/footer`);
            setComponent(Design.index);
        })();
    }, []);

    return CommonReturn(Component)({ loadingTypeTitle: `layout(footer)` });
};

export { Footer };