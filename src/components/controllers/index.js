// src/components/controllers/index.js
import React from "react";
// import { set as setMenuInfo } from "../../utils/custom/menuInfo";
import { CommonReturn } from "../../components/utils/common-return";

const Controller = ({ url, onLastLoad }) => {
    console.log(":::::Controller start:::::", Date.getNow(), url.controller);
    const [Component, setComponent] = React.useState(null);
    // const paramsState = React.useRef(url);

    React.useEffect(function() {
        (async function() {
            try {
                // // 현재 메뉴 정보 세팅
                // setMenuInfo(url);

                // 동적으로 컨트롤러 import
                let { Controller } = await import(`./${url.controller}`);

                // 컨트롤러에서 디자인 컴포넌트 처리
                const Component = Controller[url.action] || Controller.index;
                if (typeof Component !== "function") {
                    console.error("Invalid Component:", Component);
                    return;
                }
                setComponent(Component);
            }
            catch {
                console.error("Controller or action not found");
                setComponent(function() {
                    const _c = function() {
                        return (<p>Page not found</p>);
                    };
                    return _c;
                });
                // setComponent(() => <p>Page not found</p>);
            }
        })();
        // return () => {
        //     console.log("::::: 언 마운트 :::::");
        // };
    }, []);

    return CommonReturn(Component)({ url: url, onLastLoad: onLastLoad });
};

export { Controller };