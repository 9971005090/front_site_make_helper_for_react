// useLogin.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../../utils/axiosApi";
import { useAuth } from "../auth";
import addParams from "../../utils/custom/addParams";
import settings from '../../init/globalSettings';

// 로그인 후 처리해야 할 커스텀 훅 관련 import
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

export const useLogin = () => {
    const navigate = useNavigate();
    const { isAuthenticated, login, setRemember, removeRemember } = useAuth();
    const [loading, setLoading] = React.useState(false);
    const {isFirstLoadDataDone, runFirstLoadData} = settings();

    // 상태 변화를 감지하고 navigate 실행
    React.useEffect(() => {
        if (isFirstLoadDataDone() === true) {
            ////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////
            navigate(`/${window.CONSTANTS.get(`APP.DEFAULT_URI`).CONTROLLER}`);
        }
    }, [isFirstLoadDataDone]);

    const runLogin = async (form) => {

        const parameter = {
            id: form["id_input"],
            password: form["password_input"]
        };

        setLoading(true);
        try {
            const response = await post(`${window.CONSTANTS.get(`APP.API_BASE`)}/Account/LoginHIS`, addParams(parameter, form), {});
            if (response.result === true) {
                login(response);

                if (form['login_userId'] === `on`) {
                    setRemember({id: form["id_input"]});
                }
                else {
                    removeRemember();
                }

                await runFirstLoadData();

                // 로그인 후 처리해야 할 커스텀 훅 처리
                ////////////////////////////////////////////////////////////////////
                ////////////////////////////////////////////////////////////////////
            }
            else {
                alert(`로그인 실패`);
                setLoading(false);
            }
            return;

        } catch (error) {
            console.error("Login failed:", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    return { loading, runLogin };
};