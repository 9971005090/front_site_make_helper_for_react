// src/helpers/parsingOrgan.js
import $ from "cash-dom";
export const parsingForTotalUseTime = function(useTime) {
    if(useTime === 0) {
        return "-";
    }
    return Date.elapsedTimeForDurationSeconds("D_H_M", useTime * 60);
};