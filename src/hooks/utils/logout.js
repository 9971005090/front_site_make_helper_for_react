// /src/hooks/utils/login.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { POST } from "../../utils/axios-api";
import { useAuth } from "../auth";
import { useFirstLoad } from "../first-load";
import { API } from '../../components/modules/login/constants/api.js';
import { ADD_PARAMS } from "../../utils/custom/add-params";
import { format } from 'date-fns';

// 로그인 후 처리해야 할 커스텀 훅 관련 import
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

export const useLogout = () => {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();
    const [ loading, setLoading ] = React.useState(false);
    const { isDone, setIsDone } = useFirstLoad();
    const [logoutState, setLogoutState] = React.useState(false);

    React.useEffect(() => {
        if (isAuthenticated === false && logoutState === true) {
            navigate(`/login`);
        }
        return () => {
            setLogoutState(false);
        };
    }, [logoutState]);

    const runLogout = async () => {
        setLoading(true);
        const parameter = {};
        const response = await POST(`${window.CONSTANTS.get(`APP.API_BASE`)}${API.LOGOUT}`, parameter, {});
        if (response.result === true) {
            logout();
            setIsDone(false);
            setLogoutState(true);

            // 로그아웃 후 처리해야 할 커스텀 훅 처리
            ////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////
        }
        else {
            alert(`로그아웃 실패`);
            setLoading(false);
        }
    };

    return { loading, runLogout };
};