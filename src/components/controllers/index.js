// src/controllers/index.js
import React, { lazy, Suspense } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { set as setMenuInfo } from "../../utils/custom/menuInfo";

const Controller = () => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const urlSegments = location.pathname.split("/").filter(Boolean);
    const [ControllerComponent, setControllerComponent] = React.useState(null);
    const [isComponentReady, setComponentReady] = React.useState(false);
    const params = {
        controllerName: urlSegments[0],
        actionName: String.isNullOrWhitespace(urlSegments[1]) === true ?  window.CONSTANTS.get(`APP.DEFAULT_URI`).ACTION : urlSegments[1]
    };

    React.useEffect(() => {
        (async () => {
            try {
                if (isAuthenticated === false && params.controllerName !== "login") {
                    navigate("/login");
                    return;
                }
                else {
                    if (String.isNullOrWhitespace(urlSegments[0]) === true) {
                        navigate(`/${window.CONSTANTS.get(`APP.DEFAULT_URI`).CONTROLLER}`);
                        return;
                    }
                }

                // 현재 메뉴 정보 세팅
                setMenuInfo(params);

                // 동적으로 컨트롤러 import
                let { Controller } = await import(`./${params.controllerName}`);

                // 컨트롤러에서 디자인 컴포넌트 처리
                const Component = Controller[params.actionName] || Controller.index;
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
    }, [params.controllerName, params.actionName, isAuthenticated]);

    return (
        <Suspense fallback={<div>File Loading...</div>}>
            {isComponentReady && ControllerComponent ? <ControllerComponent getParams={params}/> : <p>Data Loading...</p>}
        </Suspense>
    );
};

export default Controller;