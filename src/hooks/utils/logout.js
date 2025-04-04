// /src/hooks/utils/login.js
import React from "react";
import { POST } from "../../utils/axios-api";
import { API } from '../../components/modules/login/constants/api.js';
import { useAuth as useAuthNoRender } from "../../hooks/utils-no-render/auth";
import { useFirstLoad as useFirstLoadNoRender } from "../../hooks/utils-no-render/first-load";
import { Notify } from "../../utils/global-utils";


// 로그인 후 처리해야 할 커스텀 훅 관련 import
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

export const useLogout = function() {
    const { logout } = useAuthNoRender();
    const { setIsDone } = useFirstLoadNoRender();

    const runLogout = async function(isUse = false, message = `로그아웃에 실패했습니다. 잠시 후에 시도하세요.`) {
        const parameter = {};
        const response = await POST(API.LOGOUT, parameter, {});
        if (response.result === true) {
            logout();
            setIsDone(false);
            return true;
        }
        else {
            if (isUse === true) {
                Notify(`top-center`, message, `error`);
            }
            return false;
        }
    };

    return { runLogout };
};