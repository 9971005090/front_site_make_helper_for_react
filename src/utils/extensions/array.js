
/**
 * Array 객체 확장 유틸리티
 * @fileoverview
 * - Array 객체에 커스텀 메서드를 추가하여 기능 확장
 */

if (typeof Array.deepCopy !== "function") {
    /**
     * 배열을 깊은 복사하여 새로운 배열을 반환하는 함수
     *
     * @function
     * @param {Array} targetArray - 복사할 배열
     * @param {string|null} [type=null] - 복사 방식 선택 (`structuredClone`, `stringify`)
     * @returns {Array} 복사된 새로운 배열
     *
     * @description
     * - 배열의 주소가 아닌 값 자체를 복사하여 새로운 배열을 생성
     * - 기본적으로 `structuredClone`을 사용하며, 예외 발생 시 `JSON.stringify`로 대체
     * - `type`이 `stringify`이면 `JSON.parse(JSON.stringify())` 방식으로 복사
     */
    Array.deepCopy = function(targetArray, type = null) {
        let processType = `structuredClone`;
        if (type !== null) {
            processType = type;
        }
        if (processType === `stringify`) {
            return JSON.parse(JSON.stringify(targetArray));
        }
        // else if (processType === `cloneDeep`) {
        //     return _.cloneDeep(targetArray);
        // }
        else if (processType  === `structuredClone`) {
            try {
                return structuredClone(targetArray);
            }
            catch(e) {
                return JSON.parse(JSON.stringify(targetArray));
            }
        }
        else { // 기본 stringify
            return JSON.parse(JSON.stringify(targetArray));
        }
    };
}
if (typeof Array.routeChangeCallback !== "function") {
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
     * - `window.CONSTANTS.get/set`을 사용하여 전역 상태 관리
     */
    Array.routeChangeCallback = function(callback = null) {
        const routeChangeCallback = window.CONSTANTS.get(`APP.ROUTE_CHANGE_CALLBACK`);
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
        window.CONSTANTS.set(`APP.ROUTE_CHANGE_CALLBACK`, routeChangeCallback, true);
    };
}