// /src/hooks/utils/login.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { POST } from "../../utils/axios-api";
import { useAuth } from "../auth";
import { useFirstLoad } from "../first-load";
import { ADD_PARAMS } from "../../utils/custom/add-params";
import { SETTINGS } from '../../init/global-settings';
import { API } from '../../components/modules/login/constants/api.js';
import { format } from 'date-fns';
import { Notify } from "../../utils/global-utils";

// 로그인 후 처리해야 할 커스텀 훅 관련 import
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

export const useLogin = function() {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated, login, setRemember, removeRemember } = useAuth();
    const [ loading, setLoading ] = React.useState(false);
    const { runFirstLoadData } = SETTINGS();
    const { isDone } = useFirstLoad();

    React.useEffect(function() {
        if (isDone === true) {
            ////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////
            navigate(`/${window.CONSTANTS.get(`APP.DEFAULT_URL`).CONTROLLER}`, { state: { back: location.pathname } });
        }
    }, [isDone]);

    React.useEffect(function() {
        if (isAuthenticated === true) {
            (async function() {
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
        const response = await POST(`${API.LOGIN}`, ADD_PARAMS(parameter, form), {});
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
            Notify(`top-center`, `로그인 실패.`, `error`);
            setLoading(false);
        }
    };

    return { loading, runLogin };
};