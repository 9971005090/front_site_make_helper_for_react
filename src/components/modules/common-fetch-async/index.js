// src/components/modules/common-fetch/index.js
import React from "react";
import ReactDOM from "react-dom/client";

import $ from "cash-dom";
import { CommonReturn } from "../../../components/utils/common-return";

const CommonFetchAsync = (() => {
    let container = null;
    let root = null;
    const CommonFetchComponent = function ({ paramFetchData, paramType }) {
        const [Component, setComponent] = React.useState(null);

        React.useEffect(() => {
            (async () => {
                const { Design } = await import(`./template/${window.CONSTANTS.get(`APP.THEME`)}/${paramType}`);
                setComponent(Design.index);
            })();
        }, []);

        return CommonReturn(Component)({ paramFetchData: paramFetchData, loadingTypeTitle: `common-fetch` });
    };

    const run = (selector, paramFetchData, paramType) => {
        container = $(selector)[0];
        if (String.isNullOrWhitespace(root) === true) {
            root = ReactDOM.createRoot(container);
        }
        root.render(
            <CommonFetchComponent paramFetchData={paramFetchData} paramType={paramType} />
        );
    };

    const close = () => {
        // root.unmount();
        container.remove();
    };

    return {
        run: run,
        close: close
    };
})();

export { CommonFetchAsync };


