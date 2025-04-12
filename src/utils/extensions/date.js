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
if (typeof Date.elapsedTimeForDurationSeconds !== "function") {
    Date.elapsedTimeForDurationSeconds = function(type = "year", duration = null) {
        if (duration === null) {
            return "-";
        }

        // 지난 최종 초..
        let elapsedSeconds = Math.round(duration);
        if (type === "year") {
            return Math.ceil(elapsedSeconds / (86400 * 365));
        }
        if (type === "month") {
            return Math.ceil(elapsedSeconds / (86400 * 30));
        }
        if (type === "day") {
            return Math.ceil(elapsedSeconds / (86400 * 1));
        }
        if (type === "hour") {
            return Math.ceil(elapsedSeconds / (60 * 60));
        }
        if (type === "minute") {
            return Math.ceil(elapsedSeconds / (60 * 1));
        }
        if (type === "seconds") {
            return elapsedSeconds;
        }
        if (type === "d_h_m_s") {
            if (elapsedSeconds > 60) {
                let d = Math.floor(elapsedSeconds / (3600*24));
                let h = Math.floor(elapsedSeconds % (3600*24) / 3600);
                let m = Math.floor(elapsedSeconds % 3600 / 60);
                let s = Math.floor(elapsedSeconds % 60);
                return `${String.setFillString(d, 2)}D ${String.setFillString(h, 2)}h ${String.setFillString(m, 2)}m ${String.setFillString(s, 2)}s`;
            }
            else if (elapsedSeconds === 0) {
                return `00D 00h 00m 00s`;
            }
            else {
                return `00D 00h 00m ${String.setFillString(elapsedSeconds, 2)}s`;
            }
        }
        if(type ==="D_H_M"){
            if (elapsedSeconds > 60) {
                let d = Math.floor(elapsedSeconds / (3600*24));
                let h = Math.floor(elapsedSeconds % (3600*24) / 3600);
                let m = Math.floor(elapsedSeconds % 3600 / 60);
                return `${String.setFillString(d, 2)}D ${String.setFillString(h, 2)}H ${String.setFillString(m, 2)}M`;
            }
        }
        if (type === "d_h_m") {
            if (elapsedSeconds > 60) {
                let d = Math.floor(elapsedSeconds / (3600*24));
                let h = Math.floor(elapsedSeconds % (3600*24) / 3600);
                let m = Math.floor(elapsedSeconds % 3600 / 60);
                return `${String.setFillString(d, 2)}D ${String.setFillString(h, 2)}h ${String.setFillString(m, 2)}m`;
            }
            else if (elapsedSeconds === 0) {
                return `00:00:00`;
            }
            else {
                return `00:00:${String.setFillString(elapsedSeconds, 2)}`;
            }
        }
        if (type === "h_m_s") {
            if (elapsedSeconds > 60) {
                let h = Math.floor(elapsedSeconds % (3600*24) / 3600);
                let m = Math.floor(elapsedSeconds % 3600 / 60);
                let s = Math.floor(elapsedSeconds % 60);
                return `${String.setFillString(h, 2)}:${String.setFillString(m, 2)}:${String.setFillString(s, 2)}`;
            }
            else if (elapsedSeconds === 0) {
                return `00:00:00`;
            }
            else {
                return `00:00:${String.setFillString(elapsedSeconds, 2)}`;
            }
        }
        if (type === "m_s") {
            if (elapsedSeconds > 60) {
                let m = Math.floor(elapsedSeconds % 3600 / 60);
                let s = Math.floor(elapsedSeconds % 60);
                return `${String.setFillString(m, 2)}:${String.setFillString(s, 2)}`;
            }
            else {
                return `00:${String.setFillString(elapsedSeconds, 2)}`;
            }
        }
    };
}