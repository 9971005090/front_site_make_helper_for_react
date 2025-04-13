// src/utils/api/custom/device/common.js


export const UTIL = {
    DECIMAL_TO_HEXADECIMAL : function(value, notation = 16) {
        let number = (`000${value.toString(notation)}`).slice(-5);
        return `${number.slice(0,1).toUpperCase()}:${number.slice(1,3).toUpperCase()}:${number.slice(-2).toUpperCase()}`;
    },
};
