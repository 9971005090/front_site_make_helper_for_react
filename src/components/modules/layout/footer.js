// src/components/modules/layout/footer.js
import React from "react";
import { CommonReturn } from "../../../components/utils/common-return";
import { useVariable as useVariableNoRender } from "../../../hooks/utils-no-render/variable";

const Footer = function({ url }) {
    console.log(":::::module > layout > Footer:::::", Date.getNow());
    const [Component, setComponent] = React.useState(null);
    const { get: getVariable } = useVariableNoRender();

    React.useEffect(function() {
        (async function() {
            console.log("getVariable(`APP.THEME`):::::", getVariable(`APP.THEME`));
            const { Design } = await import(`./template/${getVariable(`APP.THEME`)}/footer`);
            setComponent(Design.index);
        })();
    }, []);

    return CommonReturn(Component)({ loadingTypeTitle: `layout(footer)` });
};

export { Footer };