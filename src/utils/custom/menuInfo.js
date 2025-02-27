// src/utils/custom/menuInfo
export const set = function(params) {
    window.CONSTANTS.set(`NOW_CONTROLLER`, params.controllerName, true);
    window.CONSTANTS.set(`NOW_ACTION`, params.actionName, true);
};