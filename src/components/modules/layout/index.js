// src/components/modules/layout/index.js
import React from "react";
import { format } from 'date-fns';
import { Controller } from '../../controllers';
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/auth";
import { notify } from '../../../utils/global-utils';
import { CommonReturn } from "../../../components/utils/common-return";

// console.log(format(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS'));
export const Layout = () => {
    const { isAuthenticated } = useAuth();
    const [ isUrlChange, setUrlChange ] = React.useState(false);
    const [Component, setComponent] = React.useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const urlSegments = (function() {
        return location.pathname.split("/").filter(Boolean);
    })();
    const paramsState = React.useRef({
        controllerName: String.isNullOrWhitespace(urlSegments[0]) === true ? window.CONSTANTS.get(`APP.DEFAULT_URI`).CONTROLLER : urlSegments[0],
        actionName: String.isNullOrWhitespace(urlSegments[1]) === true ? window.CONSTANTS.get(`APP.DEFAULT_URI`).ACTION : urlSegments[1]
    });
    const checkInfo = React.useRef({
        uri: null,
        isLoadingComponent: false
    });
    const loadingComponent = async function() {
        if (String.isLayoutNeeded(paramsState.current.controllerName) === true) {
            const { Design } = await import(`./template/${window.CONSTANTS.get(`APP.THEME`)}/layout`);
            setComponent(Design.index);
        }
        else {
            setComponent(() => {
                function _d() {
                    return <><Controller uriParams={paramsState.current} /></>;
                }
                return _d;
            });
        }
    };

    React.useEffect(() => {
        paramsState.current.controllerName = String.isNullOrWhitespace(urlSegments[0]) === true ? window.CONSTANTS.get(`APP.DEFAULT_URI`).CONTROLLER : urlSegments[0];
        paramsState.current.actionName = String.isNullOrWhitespace(urlSegments[1]) === true ? window.CONSTANTS.get(`APP.DEFAULT_URI`).ACTION : urlSegments[1];
        if (window.CONSTANTS.get(`APP.IS_AUTH`) === true) {
            if (isAuthenticated === false && paramsState.current.controllerName !== "login") {
                checkInfo.current.uri = `/login`;
                paramsState.current.controllerName = `login`;
                paramsState.current.actionName = null;
            }
            else if (isAuthenticated === false && paramsState.current.controllerName === "login") {
                checkInfo.current.uri = `/login`;
                paramsState.current.actionName = null;
            }
            else {
                if (paramsState.current.controllerName === `login`) {
                    paramsState.current.controllerName = window.CONSTANTS.get(`APP.DEFAULT_URI`).CONTROLLER;
                    paramsState.current.actionName = window.CONSTANTS.get(`APP.DEFAULT_URI`).ACTION;
                }
            }
        }
        checkInfo.current.uri = `/${paramsState.current.controllerName}`;
        if (paramsState.current.actionName !== null) {
            checkInfo.current.uri = `${checkInfo.current.uri}/${paramsState.current.actionName}`;
        }

        if (checkInfo.current.uri !== location.state?.from) {
            setUrlChange(true);
            navigate(checkInfo.current.uri, { state: { from: location.pathname }, replace: true });
        }
        else {
            loadingComponent();
        }
    }, [navigate]);

    React.useEffect(() => {
        if (isUrlChange === true) {
            loadingComponent();
            setUrlChange(false);
        }
    }, [isUrlChange]);

    return CommonReturn(Component)({ uriParams: paramsState.current, loadingTypeTitle: `layout` });
};