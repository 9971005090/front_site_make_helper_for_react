// src/utils/custom/menuInfo
export const set = function(params) {
    window.CONSTANTS.set(`NOW_CONTROLLER`, params.controller, true);
    window.CONSTANTS.set(`NOW_ACTION`, params.action, true);
};