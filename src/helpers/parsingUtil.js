// src/helpers/parsingUtil.js
export const parsingShowNowTime = () => {
    return (
        Date.getNow('yyyy-MM-dd HH:mm:ss.SSS')
    );
};
export const parsingShowRandomString = (num) => {
    return (
        String.generateRandom(num)
    );
};