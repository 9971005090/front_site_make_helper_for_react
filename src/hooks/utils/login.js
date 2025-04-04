// /src/hooks/utils/login.js

import React from "react";
import { POST } from "../../utils/axios-api";
import { useAuth } from "../../hooks/auth";
import { ADD_PARAMS } from "../../utils/custom/add-params";
import { API } from '../../components/modules/login/constants/api.js';
import { POST_CHECK as AUTH_POST_CHECK } from '../../init/auth/post-check';

export const useLogin = function() {
    const { login, setRemember, removeRemember } = useAuth();
    const runLogin = async function(form) {
        const parameter = {
            id: form["id_input"],
            password: form["password_input"]
        };

        const response = await POST(`${API.LOGIN}`, ADD_PARAMS(parameter, form), {});
        if (response.result === true) {
            const _r = AUTH_POST_CHECK(response.userAccount.level, {isUse: true, msg: null});
            if (_r === `OK`) {
                login(response);
                if (form['login_userId'] === `on`) {
                    setRemember({id: form["id_input"]});
                }
                else {
                    removeRemember();
                }
                return {
                    result: true
                };
            }
            return {
                result: false,
                code: null
            };
        }
        else {
            return {
                result: false,
                code: response.message
            };
        }
    };

    return { runLogin };
};