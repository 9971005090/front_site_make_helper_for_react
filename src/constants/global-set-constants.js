import $ from "cash-dom";
export const GET_CONSTANTS = function(initInfo) {
    const runGlobal = (function(initInfo) {
        const globalKeyPreFix = ['APP', 'GLOBAL', 'LANGUAGE'];
        const globalMergeKey = ['CONSTANTS', 'LANGUAGE'];
        const _TqsrbxbzdTBAZtGWVfPLzGkfIEWqXV = {};
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
        const allData = function() {
            for (let key in _TqsrbxbzdTBAZtGWVfPLzGkfIEWqXV) {
                console.log("key, value:::::", key, _TqsrbxbzdTBAZtGWVfPLzGkfIEWqXV[key]);
            }
        };
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
        const has = function(name) {
            return Object.prototype.hasOwnProperty.call(_TqsrbxbzdTBAZtGWVfPLzGkfIEWqXV, name);
        };
        const getAllData = function() {
            return _TqsrbxbzdTBAZtGWVfPLzGkfIEWqXV;
        };
        const get = function(name) {
            if (Object.prototype.hasOwnProperty.call(_TqsrbxbzdTBAZtGWVfPLzGkfIEWqXV, name) === true) {
                return _TqsrbxbzdTBAZtGWVfPLzGkfIEWqXV[name];
            }
            else {
                return null;
            }
        };
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
        const multiSet = function(prefix = null, datas = null) {
            if (prefix === null || datas === null) {
                return;
            }
            for (let key in datas) {
                _TqsrbxbzdTBAZtGWVfPLzGkfIEWqXV[`${prefix}.${key}`] = datas[key];
            }
        };
        const del = function(name) {
            if (has(name) === true) {
                delete _TqsrbxbzdTBAZtGWVfPLzGkfIEWqXV[name];
            }
        };
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