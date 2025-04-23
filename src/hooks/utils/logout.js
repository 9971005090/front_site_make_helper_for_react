
/**
 * 로그아웃 관련 훅
 * @fileoverview
 * - 로그아웃 기능을 처리하는 훅으로, 서버에 로그아웃 요청을 보내고 결과에 따라 상태를 변경
 * - 로그아웃 후 필요한 상태 초기화 및 리소스 정리 작업 수행
 */

import React from "react";
import { POST } from "../../utils/axios-api";
import { API } from '../../components/modules/login/constants/api.js';
import { useAuth as useAuthNoRender } from "../../hooks/utils-no-render/auth";
import { useFirstLoad as useFirstLoadNoRender } from "../../hooks/utils-no-render/first-load";
import { Notify } from "../../utils/global-utils";

/**
 * 로그아웃 처리를 위한 커스텀 훅
 * @returns {Object} 로그아웃 처리 함수
 */
export const useLogout = function() {
    const { logout } = useAuthNoRender();
    const { setIsDone } = useFirstLoadNoRender();

    /**
     * 로그아웃 처리 함수
     * @param {boolean} isUse - 로그아웃 실패 시 알림을 표시할지 여부. 기본값은 false로 알림을 표시하지 않음
     * @param {string} message - 로그아웃 실패 시 표시할 메시지. 기본값은 `로그아웃에 실패했습니다. 잠시 후에 시도하세요.`
     * @returns {boolean} - 로그아웃 처리 성공 여부. 성공 시 true, 실패 시 false 반환
     * 1. 서버에 로그아웃 요청을 보냄
     * 2. 로그아웃 성공 시 인증 상태 초기화, UI 상태 초기화 및 앱 관련 리소스 삭제 수행
     * 3. 로그아웃 실패 시 사용자에게 알림을 표시하고, false 반환
     */
    const runLogout = async function(isUse = false, message = `로그아웃에 실패했습니다. 잠시 후에 시도하세요.`) {
        const parameter = {};
        const response = await POST(API.LOGOUT, parameter, {});
        if (response.result === true) {
            logout();
            setIsDone(false);
            window.CONSTANTS.allDeleteIgnoreApp();
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