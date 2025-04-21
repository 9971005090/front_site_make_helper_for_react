
/**
 * Date 객체 확장 유틸리티
 * @fileoverview
 * - Date 객체에 커스텀 메서드를 추가하여 기능 확장
 */

import { format } from 'date-fns';

if (typeof Date.getNow !== "function") {
    /**
     * 현재 시간을 지정된 형식으로 반환하는 함수
     *
     * @function
     * @param {string} [formatString="yyyy-MM-dd HH:mm:ss.SSS"] - 날짜 형식 문자열 (date-fns format 사용)
     * @param {string|null} [setDateString=null] - 특정 날짜 문자열 (yyyy-MM-dd 형식)
     * @param {number|null} [addSeconds=null] - 현재 시간에 추가할 초 (양수/음수 가능)
     * @returns {string} 지정된 형식의 날짜 문자열
     *
     * @description
     * - 현재 시간을 `formatString` 형식으로 반환
     * - `setDateString`이 주어지면 해당 날짜를 기준으로 설정
     * - `addSeconds` 값이 제공되면 현재 시간에 초를 추가하여 반환
     */
    Date.getNow = function(formatString = "yyyy-MM-dd HH:mm:ss.SSS", setDateString = null, addSeconds = null) {
        let date = setDateString !== null ? new Date(setDateString) : new Date();
        if (addSeconds !== null) {
            date = Date.addSeconds(date, addSeconds);
        }
        return format(date, formatString);
    };
}
if (typeof Date.getUTCOffset !== "function") {
    /**
     * 현재 날짜의 UTC 오프셋을 반환하는 함수
     *
     * @function
     * @param {Date} date - 기준이 되는 날짜 객체
     * @returns {string} UTC 오프셋 문자열 (예: "+0900")
     */
    Date.getUTCOffset = function(date) {
        const offsetMinutes = -date.getTimezoneOffset(); // 음수를 양수로 변환
        const sign = offsetMinutes >= 0 ? '+' : '-';

        // 시간과 분을 계산하여 `+0900` 형식으로 변환
        const hours = String(Math.floor(Math.abs(offsetMinutes) / 60)).padStart(2, '0');
        const minutes = String(Math.abs(offsetMinutes) % 60).padStart(2, '0');

        return `${sign}${hours}${minutes}`;
    };
}
if (typeof Date.elapsedTimeForDurationSeconds !== "function") {
    /**
     * 주어진 초 단위 지속 시간을 변환하여 반환하는 함수
     *
     * @function
     * @param {string} [type="year"] - 변환 타입 ("year", "month", "day", "hour", "minute", "seconds", "d_h_m_s", "D_H_M", "d_h_m", "h_m_s", "m_s")
     * @param {number|null} duration - 지속 시간 (초 단위)
     * @returns {string|number} 변환된 값
     */
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
if (typeof Date.addSeconds !== "function") {
    /**
     * 특정 날짜 객체에 초 단위 시간을 추가하는 함수
     *
     * @function
     * @param {Date} date - 기준 날짜 객체
     * @param {number} units - 추가할 초 단위 시간
     * @returns {Date} 초가 추가된 새로운 날짜 객체
     */
    Date.addSeconds = function(date, units) {
        let ret = new Date(date);
        ret.setTime(ret.getTime() + units * 1000);
        return ret;
    }
}