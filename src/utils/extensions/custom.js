

import { useVariable as useVariableNoRender } from "../../hooks/utils-no-render/variable";
const { get: getVariable } = useVariableNoRender();

/**
 * 객체 확장 커스텀 유틸리티
 * @fileoverview
 * - 객체에 커스텀 메서드를 추가하여 기능 확장
 *   - 사이트별(프로젝트별) 추가로 필요한 확장 추가
 */
if (typeof Array.routeChangeCallback !== "function") {
    window['APP_ROUTE_CHANGE_CALLBACK'] = new Set();
    window['APP_ROUTE_CHANGE_CALLBACK_FOR_OBJECT'] = {};

    /**
     * 라우트 변경 시 실행할 콜백을 등록하거나 실행하는 함수
     *
     * @function
     * @param {Function|null} [callback=null] - 등록할 콜백 함수 (없을 경우 실행 모드)
     * @returns {void}
     *
     * @description
     * - `callback`이 전달되면 `APP.ROUTE_CHANGE_CALLBACK` 리스트에 추가
     * - `callback`이 없으면 저장된 콜백들을 실행 후 제거
     */
    Array.routeChangeCallback = function(callback = null) {
        const routeChangeCallback = window.APP_ROUTE_CHANGE_CALLBACK;
        if (callback !== null) {
            console.log("::::Array.routeChangeCallback1::::");
            routeChangeCallback.add(callback);
        }
        else {
            console.log("::::Array.routeChangeCallback2::::");
            routeChangeCallback.forEach(function(callback) {
                callback();
                routeChangeCallback.delete(callback);
            });
        }
    };
    Array.routeChangeCallbackForObject = function(key, callback = null, param = []) {
        const routeChangeCallback = window.APP_ROUTE_CHANGE_CALLBACK_FOR_OBJECT;
        if (callback !== null) {
            console.log("::::Array.routeChangeCallbackForObject1::::");
            routeChangeCallback[key] = {
                func: callback,
                param: param
            };
        }
        else {
            console.log("::::Array.routeChangeCallbackForObject2::::");
            for (const key in routeChangeCallback) {
                if (Object.prototype.hasOwnProperty.call(routeChangeCallback, key)) {
                    console.log("routeChangeCallback[key].param::::", routeChangeCallback[key].param);
                    routeChangeCallback[key].func(...routeChangeCallback[key].param);
                    delete routeChangeCallback[key];
                }
            }
        }
    };
}
if (typeof String.isLayoutNeeded !== "function") {
    /**
     * 컨트롤러가 레이아웃을 필요로 하는지 확인하는 함수
     *
     * @function
     * @param {string} value - 컨트롤러 이름
     * @returns {boolean} 레이아웃이 필요한지 여부
     *
     * @description
     * - `APP.LAYOUT.IGNORE_CONTROLLER_NAMES`에 포함된 컨트롤러는 레이아웃을 필요로 하지 않음
     */
    String.isLayoutNeeded = function (value) {
        if (String.isNullOrWhitespace(value) === true) {
            return false;
        }
        if (getVariable(`APP.LAYOUT.IGNORE_CONTROLLER_NAMES`).indexOf(value) !== -1) {
            return false;
        }
        return true;
    };
}