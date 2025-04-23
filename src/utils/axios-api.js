
/**
 * API 요청을 처리하는 Axios 기반 유틸리티 모듈 파일
 * @fileoverview
 * - HTTP 요청(GET, POST, PUT, DELETE)을 수행하는 함수 제공
 * - 인증 상태를 반영하여 요청 헤더에 토큰 포함
 * - 세션 만료 시 자동 로그아웃 및 로그인 페이지로 리디렉션 처리
 * - 기본 요청 파라미터 설정 기능 제공
 */

import axios from 'axios';
import { useAuth as useAuthNoRender } from "../hooks/utils-no-render/auth";
import { useFirstLoad as useFirstLoadNoRender } from "../hooks/utils-no-render/first-load";
import { silentNavigate } from "../utils/silent-navigate";
import { Notify } from '../utils/global-utils';

/**
 * API 요청을 수행하는 함수
 * @param {string} method - HTTP 메서드 (GET, POST, PUT, DELETE)
 * @param {string} url - 요청 URL
 * @param {Object|null} data - 요청 본문 데이터 (POST, PUT 요청에 사용)
 * @param {Object|null} params - 요청 쿼리 파라미터 (GET 요청에 사용)
 * @param {Object} headers - 추가 요청 헤더
 * @param {Object} etc - 추가 옵션 (isErrorControlled: 오류 메시지 표시 여부, isSessionClosedControlled: 세션 종료 시 처리 여부)
 * @returns {Promise<Object>} - 서버 응답 데이터 반환
 */
const apiRequest = async function(method, url, data = null, params = null, headers = {}, etc = {isErrorControlled: false, isSessionClosedControlled: true}) {
    const { isAuthenticated, token, logout } = useAuthNoRender();
    const { setIsDone } = useFirstLoadNoRender();
    const config = {
        method,
        url,
        headers: {
            'Content-Type': "application/json;charset=UTF-8",
            'SX-Auth-Token': null,
            'SX-Client-IP': null
        },
        params,   // GET 요청 시 쿼리 파라미터
        data,     // POST, PUT 요청 시 본문 데이터
    };
    if (isAuthenticated === true) {
        config.headers['SX-Auth-Token'] = token;
    }
    try {
        // fake api 여부 확인
        if (window.CONSTANTS.has(url) === true) {
            return window.CONSTANTS.get(url);
        }
        else {
            const response = await axios(config);
            if (response.data.result === false) {
                // session_closed 처리
                if (etc.isSessionClosedControlled === true) {
                    if (window.CONSTANTS.get(`APP.API.RESPONSE_CODE`).SESSION_CLOSED === response.data.error) {
                        await logout();
                        await setIsDone(false);
                        await silentNavigate(`/${window.CONSTANTS.get(`APP.LOGIN_URL`).CONTROLLER}`, { state: { back: location.pathname } });
                    }
                }
                else if (etc.isErrorControlled === true) {
                    Notify(`top-center`, response.data.message, `error`);
                }
            }

            return response.data; // 서버로부터 받은 데이터를 반환
        }
    }
    catch (error) {
        // 오류 발생 시 에러 메시지 반환
        const errorMessage = error.response
            ? `Error: ${error.response.status} - ${error.response.data.message || error.response.statusText}`
            : error.request
                ? 'Error: No response from server'
                : `Error: ${error.message}`;
        throw new Error(errorMessage);
    }
};

/**
 * 디바이스 종류 코드 반환
 * @returns {number} 디바이스 종류 코드 (기본값: 3)
 */
const _getDeviceKindCode = function() {
    return 3;
};

/**
 * 기본 요청 파라미터 생성
 * @param {boolean} authNotInclude - 인증 정보를 포함할지 여부 (기본값: false)
 * @param {Object} parameter - 추가적인 파라미터 객체
 * @returns {Object} 기본 요청 파라미터 객체
 */
const _getDefaultParam = function(authNotInclude = false, parameter = {}) {
    let params = {};
    const date = new Date();
    const { isAuthenticated, user } = useAuthNoRender();

    if (isAuthenticated === true) {
        if (Object.prototype.hasOwnProperty.call(parameter, `requester`) === false) {
            params.requester = user.userCode;
        }
        if (Object.prototype.hasOwnProperty.call(parameter, `organizationCode`) === false) {
            params.organizationCode = user.organizationCode;
        }
    }
    if (authNotInclude === false) {
        params.requester = null;
        params.organizationCode = null;
    }

    params.deviceKind = _getDeviceKindCode();
    params.timezone =  `Asia/Seoul`;
    params.gmtCode = `GMT${Date.getUTCOffset(date)}`;
    params.requestDateTime = Date.getNow(`yyyy-MM-dd HH:mm:ss`);
    params.systemTime = date.getTime();
    params.countryCode = `Ko`;
    params.countryName = `Korea`;

    return params;
};

/**
 * HTTP GET 요청
 * @param {string} url - 요청 URL
 * @param {Object|null} params - 요청 파라미터
 * @param {Object} headers - 요청 헤더
 * @param {Function|null} callback - 콜백 함수 (옵션)
 * @returns {Promise<Object>} 서버 응답 데이터 반환
 */
export const GET = function(url, params = null, headers = {}, callback = null) {
    return apiRequest('get', url, null, params, headers);
};

/**
 * HTTP POST 요청
 * @param {string} url - 요청 URL
 * @param {Object} data - 요청 데이터
 * @param {Object} headers - 요청 헤더
 * @param {Object} etc - 추가 옵션 (isErrorControlled, isSessionClosedControlled)
 * @returns {Promise<Object>} 서버 응답 데이터 반환
 */
export const POST = function(url, data, headers = {}, etc = {isErrorControlled: false, isSessionClosedControlled: true}) {
    const params = Object.assign(_getDefaultParam(true), data);
    return apiRequest('post', `${window.CONSTANTS.get(`APP.API_BASE`)}${url}`, params, null, headers, etc);
};

/**
 * HTTP PUT 요청
 * @param {string} url - 요청 URL
 * @param {Object} data - 요청 데이터
 * @param {Object} headers - 요청 헤더
 * @param {Function|null} callback - 콜백 함수 (옵션)
 * @returns {Promise<Object>} 서버 응답 데이터 반환
 */
export const PUT = function(url, data, headers = {}, callback = null) {
    return apiRequest('put', url, data, null, headers);
};

/**
 * HTTP DELETE 요청
 * @param {string} url - 요청 URL
 * @param {Object|null} params - 요청 파라미터
 * @param {Object} headers - 요청 헤더
 * @param {Function|null} callback - 콜백 함수 (옵션)
 * @returns {Promise<Object>} 서버 응답 데이터 반환
 */
export const DEL = function(url, params = null, headers = {}, callback = null) {
    return apiRequest('delete', url, null, params, headers);
};