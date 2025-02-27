// src/utils/extensions/date.js
import { format } from 'date-fns';
if (typeof Date.getNow !== "function") {
    Date.getNow = function(formatString = "yyyy-MM-dd HH:mm:ss.SSS", setDateString = null, addSeconds = null) {
        if (setDateString === null) {
            if (addSeconds !== null) {
                let addDateObj = addSeconds(new Date(), addSeconds);
                return format(addDateObj, formatString);
            }
            else {
                return format(new Date(), formatString);
            }
            return format(new Date(), formatString);
        }
        else {
            return format(new Date(setDateString), formatString);
        }
    };
}
if (typeof Date.getUTCOffset !== "function") {
    Date.getUTCOffset = function(date) {
        const offsetMinutes = -date.getTimezoneOffset(); // 음수를 양수로 변환
        const sign = offsetMinutes >= 0 ? '+' : '-';

        // 시간과 분을 계산하여 `+0900` 형식으로 변환
        const hours = String(Math.floor(Math.abs(offsetMinutes) / 60)).padStart(2, '0');
        const minutes = String(Math.abs(offsetMinutes) % 60).padStart(2, '0');

        const timezoneOffset = `${sign}${hours}${minutes}`;
        return timezoneOffset;
    };
}