// src/controllers/index.js
import React from "react";
import { set as setMenuInfo } from "../../utils/custom/menuInfo";
import { format } from 'date-fns';
import { CommonReturn } from "../../components/utils/common-return";

const Controller = ({ uriParams, onLastLoad }) => {
    console.log(":::::Controller start:::::", Date.getNow());
    console.log(":::::uriParams, :::::", uriParams);
    const [Component, setComponent] = React.useState(null);
    // const paramsState = React.useRef(uriParams);

    React.useEffect(() => {
        (async () => {
            try {
                // 현재 메뉴 정보 세팅
                setMenuInfo(uriParams);

                // 동적으로 컨트롤러 import
                let { Controller } = await import(`./${uriParams.controller}`);

                // 컨트롤러에서 디자인 컴포넌트 처리
                const Component = Controller[uriParams.action] || Controller.index;
                if (typeof Component !== "function") {
                    console.error("Invalid Component:", Component);
                    return;
                }
                setComponent(Component);
            } catch {
                console.error("Controller or action not found");
                setComponent(() => <p>Page not found</p>);
            }
        })();
    }, []);

    return CommonReturn(Component)({ uriParams: uriParams, onLastLoad: onLastLoad });
};

export { Controller };