// src/utils/extensions/array.js
/**
 * Array object 확장
 */
if (typeof Array.deepCopy !== "function") {
    /**
     * array의 주소 할당이 아닌, 값 복사 처리
     * @param {array} targetArray 복사를 하려는 array
     * @returns {array} 복사된 배열
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
     * array의 주소 할당이 아닌, 값 복사 처리
     * @param {array} targetArray 복사를 하려는 array
     * @returns {array} 복사된 배열
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