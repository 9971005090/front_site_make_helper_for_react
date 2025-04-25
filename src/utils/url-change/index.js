
/**
 * 동적 라우터 처리를 위한 url 파싱 파일
 * @fileoverview
 * - 애플리케이션의 URL을 동적으로 관리하고 해석하는 기능을 제공
 * - 루트("/") 접속 시 기본 URL로 설정
 * - 인증되지 않은 사용자는 로그인 URL로 설정
 * - URL을 파싱하여 controller 및 action 값을 자동 설정
 */

import { useAuth as useAuthNoRender } from "../../hooks/utils-no-render/auth";
import { useVariable as useVariableNoRender } from "../../hooks/utils-no-render/variable";

/**
 * URL 변경을 처리하는 객체
 *
 * @namespace URL_CHANGE
 * @description
 * - 현재 URL을 분석하여 적절한 controller 및 action 값을 설정
 * - 루트("/") 접속 시 기본 URL로 설정
 * - 인증되지 않은 사용자는 로그인 URL로 설정
 * - 변경된 URL 정보를 반환하여 라우팅을 동적으로 관리
 */
const URL_CHANGE = {
    /**
     * 현재 URL을 기반으로 컨트롤러 및 액션 정보를 설정하는 함수
     *
     * @function
     * @memberof URL_CHANGE
     *
     * @param {object|null} location - 현재 위치 객체 (React Router의 location 객체)
     * @param {string} location.pathname - 현재 경로 문자열
     * @param {object} location.state - 상태 정보 객체
     * @param {string} location.state.back - 이전 경로 문자열
     *
     * @returns {object} URL 정보 객체
     * @returns {string} return.controller - 현재 컨트롤러명
     * @returns {string|null} return.action - 현재 액션명
     * @returns {object} return.change - 경로 변경 정보
     * @returns {string|null} return.change.path - 변경된 전체 경로 (없으면 null)
     * @returns {boolean} return.change.controller - 컨트롤러 변경 여부
     * @returns {boolean} return.change.action - 액션 변경 여부
     *
     * @description
     * - 현재 URL을 분석하여 `controller` 및 `action` 값을 결정
     * - 사용자가 인증된 상태인지 확인하여 로그인 URL로 설정
     * - /(루트) 접속 여부 확인하여 기본 url 로 설정
     */
    PROCESS: function(location = null) {
        // 랜더링이 안되려면 직접 조회해서 사용해야한다.
        const { isAuthenticated } = useAuthNoRender();
        const { get: getVariable } = useVariableNoRender();

        const _connect_root = function() {
            if (document.location.pathname !== `/`) {
                url['controller'] = tempPath[0];
                url['action'] = String.isNullOrWhitespace(tempPath[1]) === true ? `index` : tempPath[1];
            }
            else {
                url.change.path = `${url['controller']}/${url['action']}`;
            }
        };
        const url = {
            'controller': getVariable(`APP.DEFAULT_URL`).CONTROLLER,
            'action': getVariable(`APP.DEFAULT_URL`).ACTION,
            'change': {
                'path': null,
                'controller': false,
                'action': false
            }
        };
        const backTempPath = (location !== null && location.state !== null) ? location.state.back.split(`/`).filter(Boolean) : null;
        const tempPath = (location === null || location.pathname === null) ? document.location.pathname.split(`/`).filter(Boolean) : location.pathname.split(`/`).filter(Boolean);

        if (isAuthenticated === true) {
            _connect_root();
        }
        else {
            url['controller'] = `login`;
            url['action'] = null;
            if (document.location.pathname.indexOf(`login`) === -1) {
                url.change.path = `/${url['controller']}`;
            }
        }

        // controller 나 action 이 변경됐는지 확인(래더링에 영향을 주지 않는 전역 변수 초기화를 위해)
        if (backTempPath === null) {
            url.change.controller = true;
            url.change.action = true;
        }
        else if (backTempPath[0] !== tempPath[0]) {
            url.change.controller = true;
        }
        else if (backTempPath[1] !== tempPath[1]) {
            url.change.action = true;
        }
        return url;
    }
};

export { URL_CHANGE };