// src/controllers/index.js
import React, { lazy, Suspense } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { set as setMenuInfo } from "../../utils/custom/menuInfo";
import { format } from 'date-fns';

const Controller = ({ uriParams }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const urlSegments = location.pathname.split("/").filter(Boolean);
    const [ControllerComponent, setControllerComponent] = React.useState(null);
    const [isComponentReady, setComponentReady] = React.useState(false);
    const paramsState = React.useRef(uriParams); // ready, searching

    React.useEffect(() => {
        (async () => {
            try {
                // 현재 메뉴 정보 세팅
                setMenuInfo(paramsState.current);

                // 동적으로 컨트롤러 import
                let { Controller } = await import(`./${paramsState.current.controllerName}`);

                // 컨트롤러에서 디자인 컴포넌트 처리
                const Component = Controller[paramsState.current.actionName] || Controller.index;
                if (typeof Component !== "function") {
                    console.error("Invalid Component:", Component);
                    return;
                }
                setControllerComponent(Component);
                setComponentReady(true);
            } catch {
                console.error("Controller or action not found");
                setControllerComponent(() => <p>Page not found</p>);
            }
        })();
    }, []);

    return (
        <Suspense fallback={<div>File Controller Loading...</div>}>
            {isComponentReady && ControllerComponent ? <ControllerComponent uriParams={paramsState.current} /> : <p>Data Controller Loading...</p>}
        </Suspense>
    );
};

export { Controller };