// /src/hooks/utils/login.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { POST } from "../../utils/axios-api";
import { useAuth } from "../auth";
import { useFirstLoad } from "../first-load";
import { useCheck } from "../check";
import { ADD_PARAMS } from "../../utils/custom/add-params";
import { SETTINGS } from '../../init/global-settings';
import { format } from 'date-fns';

// 로그인 후 처리해야 할 커스텀 훅 관련 import
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

export const useLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isUrlChange, isNavigateChange, setUrlChange, setNavigateChange } = useCheck();
    const { isAuthenticated, login, setRemember, removeRemember } = useAuth();
    const [ loading, setLoading ] = React.useState(false);
    const { runFirstLoadData } = SETTINGS();
    const { isDone } = useFirstLoad();

    React.useEffect(() => {
        if (isDone === true) {
            ////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////
            navigate(`/${window.CONSTANTS.get(`APP.DEFAULT_URI`).CONTROLLER}`, { state: { from: location.pathname } });
        }
    }, [isDone]);

    React.useEffect(() => {
        if (isAuthenticated === true) {
            (async () => {
                await runFirstLoadData();
            })();
        }
    }, [isAuthenticated]);

    const runLogin = async (form) => {

        const parameter = {
            id: form["id_input"],
            password: form["password_input"]
        };

        setLoading(true);
        const response = await POST(`${window.CONSTANTS.get(`APP.API_BASE`)}/Account/LoginHIS`, ADD_PARAMS(parameter, form), {});
        if (response.result === true) {
            login(response);
            if (form['login_userId'] === `on`) {
                setRemember({id: form["id_input"]});
            }
            else {
                removeRemember();
            }

            // 로그인 후 처리해야 할 커스텀 훅 처리
            ////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////
        }
        else {
            alert(`로그인 실패`);
            setLoading(false);
        }
    };

    return { loading, runLogin };
};