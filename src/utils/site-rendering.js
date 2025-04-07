// src/utils/global-utils.js
import React from "react";
import ReactDOM from "react-dom/client";
import $ from "cash-dom";
import _ from "lodash";


/*
const object = {
        'container': {
            'id': `site-rendering`,
        },
        'root': null,
        'message': `사이트 로딩 시작`
    };
    if (mode === `end`) {
        object.message = `사이트 로딩 완료`;
    }
    if ($(`#site-rendering`).length <= 0) {
        $(`body`).append((`<div id='${object.container.id}'>`));
        object.root = ReactDOM.createRoot($(`<div id='${object.container.id}'>`)[0]);

        object.root.render(
            <><SiteRenderingComponent message={object.message} /></>
        );
    }
    else {
        $(`#site-rendering > p`).text(object.message);
    }
 */

const SiteRendering = (function() {
    // const container = document.createElement(`div`);
    const container = $(`<div>`).attr(`id`, `site-rendering`);
    const root = ReactDOM.createRoot(container[0]);
    const parsingValue = {
        message: `사이트 로딩 시작`
    };

    const SiteRenderingComponent = function({ parsingValue }) {
        // const [Component, setComponent] = React.useState(null);
        //
        // React.useEffect(function() {
        //     // console.log(`useEffect 최상단 - ${format(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS')}`);
        //     (async function() {
        //         try {
        //             // 스타일 추가
        //             ////////////////////////////////////////////////////////////////////
        //             // await import(`./assets/css/${window.CONSTANTS.get(`APP.THEME`)}/index.css`);
        //             ////////////////////////////////////////////////////////////////////
        //
        //             // const { Design } = await import(`./templates/${window.CONSTANTS.get(`APP.THEME`)}/index`);
        //             // setComponent( Design );
        //             setComponent(function() {
        //                 const _c = function() {
        //                     return (<p style={{display: `None`}}>{parsingValue.message}</p>);
        //                 };
        //                 return _c;
        //             });
        //         }
        //         catch (error) {
        //             console.error("Failed to load design component:", error);
        //         }
        //     })();
        // }, []);
        const Component = function() {
            const _c = function Com() {  // ✅ 컴포넌트 이름 추가
                return (<p style={{display: `None`}}>{parsingValue.message}</p>);
            };
            return _c;
        };


        if (Component === null) {
            return null;
        }

        return <Component parsingValue={parsingValue} />;
    };

    const run = function(mode = `start`) {
        if (mode === `end`) {
            parsingValue.message = `사이트 로딩 완료`;
        }
        if ($(`#site-rendering`).length <= 0) {
            document.body.appendChild(container[0]);
            root.render(
                <SiteRenderingComponent parsingValue={parsingValue}/>
            );
        }
        else {
            $(`#site-rendering > p`).text(parsingValue.message);
        }
    };

    function close() {
        console.log("close");
        // root.unmount();
        container.remove();
    }

    return {
        run: run,
        close: close
    };
})();

export { SiteRendering };
