"use strict";
export const CONST = {
    USE: {
        CODE: {
            ALL: -1,
            TRUE: 1,
            FALSE: 0,
        },
        TITLE: {},
        TITLE2: new Map()
    },
    TYPE: {
        CODE: {
            ALL: 0,
            ECG: 1,
            TEMP: 2,
            SPO2: 3,
            BP: 6,
            TAG: 8,
        },
        TITLE: {}
    },
    PREFIX_ADDRESS: {
        ECG: "08:D5:C0:5",
        TEMPERATURE: "08:D5:C0:6",
        SPO2: "08:D5:C0:4", // 00:1C:05:FF:3A:CC, 08:D5:C0:00:74:A9
        BP: "08:D5:C0:7",
        TAG: "08:D5:C0:1"
    },
    INIT: function(){

    }
};
CONST.USE.TITLE[CONST.USE.CODE.ALL] = `전체`;
CONST.USE.TITLE[CONST.USE.CODE.TRUE] = `사용`;
CONST.USE.TITLE[CONST.USE.CODE.FALSE] = `비사용`;
// 객체의 숫자 정렬은 자동적으로 오름 차순으로 정렬되는데, 양수(0포함)가 먼저되고, 음수는 삽입순으로
// 그래서 전체 -1을 먼저 표시하기 위해, map을 사용
CONST.USE.TITLE2.set(CONST.USE.CODE.ALL, `전체`);
CONST.USE.TITLE2.set(CONST.USE.CODE.TRUE, `사용`);
CONST.USE.TITLE2.set(CONST.USE.CODE.FALSE, `비사용`);
CONST.TYPE.TITLE[CONST.TYPE.CODE.ALL] = `전체`;
CONST.TYPE.TITLE[CONST.TYPE.CODE.ECG] = `ECG`;
CONST.TYPE.TITLE[CONST.TYPE.CODE.TEMP] = `TEMP`;
CONST.TYPE.TITLE[CONST.TYPE.CODE.SPO2] = `SpO2`;
CONST.TYPE.TITLE[CONST.TYPE.CODE.BP] = `BP`;
CONST.TYPE.TITLE[CONST.TYPE.CODE.TAG] = `Tag`;
CONST.INIT();