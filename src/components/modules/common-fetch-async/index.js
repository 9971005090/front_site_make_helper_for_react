// src/components/modules/common-fetch-async/index.js
import React from "react";
import ReactDOM from "react-dom/client";

import $ from "cash-dom";
import { CommonReturn } from "../../../components/utils/common-return";
import { UTIL as ORGAN_UTIL } from "../../../utils/api/organ";

const CommonFetchAsync = (() => {
    let container = null;
    let root = null;
    const CommonFetchComponent = function ({ search, paramFetchData, currentPage, paramType, now, navigate }) {
        const [Component, setComponent] = React.useState(null);
        const [isLoaded, setIsLoaded] = React.useState(false);
        const onLoad = () => {
            setIsLoaded((state) => !state);
        };

        React.useEffect(() => {
            ////////////////////////////////////////////////////////////////////
            (async function() {
                try {
                    ////////////////////////////////////////////////////////////////////
                    // 유지 보수를 위해, 파일로 빼지만, 사용하는 함수나 state 등은 모두 파라미터로 보낸다.
                    (await import(`./events/default/index`)).event({search: search, currentPage: currentPage, callbackFunc: ORGAN_UTIL.UPDATE_EXPIRATION_LIST, navigate: navigate});
                    ////////////////////////////////////////////////////////////////////

                } catch (error) {
                    console.error("Failed to load design component:", error);
                }
            })();
            ////////////////////////////////////////////////////////////////////
            return () => {
                // $(`.page-item`).off(`click`);
            };
        }, [isLoaded]);

        React.useEffect(() => {
            (async () => {
                const { Design } = await import(`./template/${window.CONSTANTS.get(`APP.THEME`)}/${paramType}`);
                setComponent(Design.index);
            })();
        }, []);

        return CommonReturn(Component)({ paramFetchData: paramFetchData, loadingTypeTitle: `common-fetch`, now: now, onLoad: onLoad });
    };

    const run = (selector, search, paramFetchData, currentPage, paramType, now, isFirst, navigate) => {
        container = $(selector)[0];
        if (String.isNullOrWhitespace(root) === true) {
            root = ReactDOM.createRoot(container);
        }
        else {
            if (isFirst === true) {
                root.unmount();
                root = ReactDOM.createRoot(container);
            }
        }
        root.render(
            <CommonFetchComponent search={search} paramFetchData={paramFetchData} currentPage={currentPage} paramType={paramType} now={now} navigate={navigate} />
        );
    };

    const close = () => {
        if (root !== null) {
            root.unmount();
        }

        // if (container !== null) {
        //     container.remove();
        // }

    };

    return {
        run: run,
        close: close
    };
})();

export { CommonFetchAsync };


