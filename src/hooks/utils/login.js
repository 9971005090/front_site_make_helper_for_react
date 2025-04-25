
/**
 * 로그인 관련 훅
 * @fileoverview
 * - 로그인 기능을 처리하는 훅으로, 서버에 로그인 요청을 보내고 결과에 따라 상태를 변경
 * - 사용자의 인증 정보와 세션 관리 및 환경설정 처리 포함
 */

import React from "react";
import { POST } from "../../utils/axios-api";
import { useAuth } from "../../hooks/auth";
import { ADD_PARAMS } from "../../utils/custom/add-params";
import { API } from '../../components/modules/login/constants/api.js';
import { POST_CHECK as AUTH_POST_CHECK } from '../../init/auth/post-check';
import { SET as SITE_ENVIRONMENT_FOR_SET } from "../../utils/environment/index";
import { useVariable as useVariableNoRender } from "../../hooks/utils-no-render/variable";


/**
 * 로그인 처리를 위한 커스텀 훅
 * @returns {Object} 로그인 처리 함수
 */
export const useLogin = function() {
    const { login, setRemember, removeRemember } = useAuth();
    const { init: initVariable } = useVariableNoRender();

    /**
     * 로그인 처리 함수
     * @param {Object} form - 로그인 폼 데이터
     * @returns {Object} - 로그인 처리 결과
     * - 로그인 성공 시 true 반환, 실패 시 실패 코드와 함께 false 반환
     */
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

                initVariable();
                // 기본 사항 처리
                SITE_ENVIRONMENT_FOR_SET();

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