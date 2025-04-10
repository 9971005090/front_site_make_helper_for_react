// src/utils/axios-api.js
// 일반 함수에서는 훅을 사용할 수 없다.
// useSelector, useDispatch 이건 꼭 콤포넌트 안에서만 사용해야 한다.
// const { _isAuthenticated, _token } = state.auth; 이걸 맨 상단에 미리 불러놓지 않는 이유는
// 로그인 처리시의 상태변경보다, 먼저 상태값을 유지 하고 있기 때문에, 해당 함수가 호출 하는 시점에 상태를 조회하는게 맞다.

import axios from 'axios';
import { useAuth as useAuthNoRender } from "../hooks/utils-no-render/auth";
import { useFirstLoad as useFirstLoadNoRender } from "../hooks/utils-no-render/first-load";
import { silentNavigate } from "../utils/silent-navigate";
import { Notify } from '../utils/global-utils';




// 기본 API 요청 함수
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
const _getDeviceKindCode = function() {
    return 3;
};
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

// HTTP GET 요청
export const GET = function(url, params = null, headers = {}, callback = null) {
    return apiRequest('get', url, null, params, headers);
};

// HTTP POST 요청
export const POST = function(url, data, headers = {}, etc = {isErrorControlled: false, isSessionClosedControlled: true}) {
    const params = Object.assign(_getDefaultParam(true), data);
    return apiRequest('post', `${window.CONSTANTS.get(`APP.API_BASE`)}${url}`, params, null, headers, etc);
};

// HTTP PUT 요청
export const PUT = function(url, data, headers = {}, callback = null) {
    return apiRequest('put', url, data, null, headers);
};

// HTTP DELETE 요청
export const DEL = function(url, params = null, headers = {}, callback = null) {
    return apiRequest('delete', url, null, params, headers);
};