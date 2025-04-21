
/**
 * 사이트에서 랜더링에 관여하지 않는 전역 변수 관리
 * @fileoverview
 * - window 전역 객체를 이용하여, 사이트 어디에서도 전역 변수값을 확인가능하다.(내부는 즉시 실행으로 하여, 결과를 반환한다)
 *   > redux 를 사용하지 않고, 랜더링에 관여하지 않는 변수만을 사용한다.
 *     사이트 로딩시 설정하거나, 기능별에서도 사용이 가능하다.
 */

import $ from "cash-dom";

/**
 * 전역 변수 관리 함수
 *
 * @param {Object} key/value - 초기 설정하려는 상수값 정보들
 *
 * @example
 *  const APP_CONSTANT = {'APP.VERSION.REAL': '0.0.38-20250321.1424'};
 *  window.CONSTANTS = GET_CONSTANTS(APP_CONSTANT);
 *  이후
 *  불러올때 window.CONSTANTS.get(key);
 *  설정올때 window.CONSTANTS.set(key, value, true); 강제로 설정
 *  나머지는 소스에서 파악
 *
 * @returns {Object} 전역 변수 관리 객체(초기 값을 세팅한 그리고 get/set 등을 할 수 있는 객체를 전달한다.)
 */
const GET_CONSTANTS = function(initInfo) {
    const runGlobal = (function(initInfo) {
        // 사이트 로딩 후 절대 지우지 않는 변수 접두어
        // LANGUAGE 키는 설정비 객체로 설정해야한다. 따로 제약은 두지 않았으나, 객체로 해서, 모두 merge를 하는 개념으로 처리했음
        const globalKeyPreFix = ['APP', 'GLOBAL', 'LANGUAGE'];
        // 이 접두어 사용시
        const globalMergeKey = ['CONSTANTS', 'LANGUAGE'];
        const _TqsrbxbzdTBAZtGWVfPLzGkfIEWqXV = {};

        /**
         * 전역 변수 값 초기화 상태 처리 함수
         *
         * @description
         *  - 사이트 로딩시 세팅된 기본 변수, 다국어 기본을 제외한 커스텀 변수를 모두 삭제하는 함수
         *
         * @returns {void}
         */
        const init = function() {
            let checkKeyName = null;
            for (let key in _TqsrbxbzdTBAZtGWVfPLzGkfIEWqXV) {
                checkKeyName = key.split(`.`)[0];
                if (globalKeyPreFix.indexOf(checkKeyName) === -1) {
                    del(key);
                }
            }
            // 특별 처리 LANGUAGE 하위의 base/layout 만 남기고, 나머지는 모두 지우기
            let _l = get('LANGUAGE');
            let _k = ['BASE', 'LAYOUT'];
            for (let key in _l) {
                if (_k.indexOf(key) === -1) {
                    delete _l[key];
                }
            }
        };

        /**
         * 현재 설정한 전역 변수 정보 출력(console에)
         * > 디버깅을 위해서 가끔 사용됨
         *
         * @returns {void}
         */
        const allData = function() {
            for (let key in _TqsrbxbzdTBAZtGWVfPLzGkfIEWqXV) {
                console.log("key, value:::::", key, _TqsrbxbzdTBAZtGWVfPLzGkfIEWqXV[key]);
            }
        };

        /**
         * APP 키를 제외한 모두 강제 삭제 함수
         * > 거의 사용 안함
         *
         * @returns {void}
         */
        const allDeleteIgnoreApp = function() {
            for (let key in _TqsrbxbzdTBAZtGWVfPLzGkfIEWqXV) {
                let checkKeyName = null;
                let checkGlobalKeyPreFix = globalKeyPreFix[0];
                checkKeyName = key.split(`.`)[0];
                if (checkGlobalKeyPreFix.indexOf(checkKeyName) === -1) {
                    del(key);
                }
            }
        };

        /**
         * 현재 설정이 된 변수인지 확인 하는 함수
         * > 거의 사용 안함(없는 키를 get 할 경우에는 null로 반환)
         *
         * @returns {boolean} true/false
         */
        const has = function(name) {
            return Object.prototype.hasOwnProperty.call(_TqsrbxbzdTBAZtGWVfPLzGkfIEWqXV, name);
        };

        /**
         * 현재 설정된 전역 변수를 모두 반환하는 함수
         * > 거의 사용 안함
         *
         * @returns {Object} 전역 변수 객체
         */
        const getAllData = function() {
            return _TqsrbxbzdTBAZtGWVfPLzGkfIEWqXV;
        };

        /**
         * 전달받은 key값에 대응하는 값을 반환하는 함수
         *
         * @param {string} name - 조회할 key 값
         *
         * @returns {number|string|object|null} 사용자가 설정한 값, 없을 경우 null 반환
         */
        const get = function(name) {
            if (Object.prototype.hasOwnProperty.call(_TqsrbxbzdTBAZtGWVfPLzGkfIEWqXV, name) === true) {
                return _TqsrbxbzdTBAZtGWVfPLzGkfIEWqXV[name];
            }
            else {
                return null;
            }
        };

        /**
         * 전달받은 key값에 대응하는 값을 반환하는 함수
         *
         * @param {string} name - 설정할 key 값
         * @param {string|number|object} value - 설정할 값
         *
         * @returns {void}
         */
        const set = function(name, value, force = false) {
            const _set = function(val) {
                _TqsrbxbzdTBAZtGWVfPLzGkfIEWqXV[name] = val;
            };
            if (force === true) {
                if (globalMergeKey.indexOf(name) !== -1) {
                    let _check = {};
                    if (has(name) === true) {
                        _check = get(name);
                        $.extend(true, _check, value);
                        _set(_check);
                    }
                    else {
                        _set(value);
                    }
                }
                else {
                    _set(value);
                }
            }
            else {
                if (has(name) === false) {
                    _set(value);
                }
            }
        };

        /**
         * set은 value 자체 통체로 저장하지만,
         * 객체를 받아, key를 prefix와 합쳐 초기 설정때처럼 사용하고 싶을때 처리
         * 단! value 가 object 인지는 검사를 하지 않음
         *
         * @param {string} prefix - 설정할 key 의 접두어
         * @param {object} value - 설정할 값
         *
         * @returns {void}
         */
        const multiSet = function(prefix = null, datas = null) {
            if (prefix === null || datas === null) {
                return;
            }
            for (let key in datas) {
                _TqsrbxbzdTBAZtGWVfPLzGkfIEWqXV[`${prefix}.${key}`] = datas[key];
            }
        };

        /**
         * 전달받은 key값에 대응하는 key 자체를 삭제하는 함수
         * > 거의 사용 안함
         *
         * @param {string} name - 삭제할 key 값
         *
         * @returns {void}
         */
        const del = function(name) {
            if (has(name) === true) {
                delete _TqsrbxbzdTBAZtGWVfPLzGkfIEWqXV[name];
            }
        };

        // 초기 세팅시 설정할 값이 있는지 확인
        // 객체로 가정하고 key/value 를 설정
        if (initInfo !== null) {
            for (let key in initInfo) {
                set(key, initInfo[key], true);
            }
        }
        return {
            getAllData: getAllData,
            get: get,
            set: set,
            multiSet: multiSet,
            del: del,
            has: has,
            init: init,
            allData: allData,
            allDeleteIgnoreApp: allDeleteIgnoreApp
        };
    }(initInfo));
    return runGlobal;
};

export { GET_CONSTANTS };