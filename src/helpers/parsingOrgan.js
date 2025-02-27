// src/helpers/parsingOrgan.js
export const parsingSyncHis = (syncHis) => (
    syncHis === 0 ? "미연동" : "연동"
);
export const parsingDeviceManagerType = (deviceManagerType) => (
    deviceManagerType === 0 ? "SEERS 관리" : "병원 관리"
);