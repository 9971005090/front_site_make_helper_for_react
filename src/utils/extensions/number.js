// src/utils/extensions/number.js
/**
 * Number object 확장
 */
if (typeof Number.comma !== "function") {
    Number.comma = function(number, options = {maximumFractionDigits: 4, useZero: false}) {
        if (options.useZero === false) {
            if (number === 0 || number === "0" || number === null) {
                return "-";
            }
        }
        else {
            if (number === null) {
                return "-";
            }
        }
        return number.toLocaleString('ko-KR', options);
    };
}
if (typeof Number.lcm !== "function") {
    Number.lcm = function(num1, num2, scale = 1) {
        let tNum1 = num1 * scale;
        let tNum2 = num2 * scale;
        // 최대공약수
        let gcd = function(minNum, maxNum){
            return (minNum % maxNum) === 0 ? maxNum : gcd(maxNum, minNum % maxNum);
        };
        // 최소공배수
        let lcm = function(minNum, maxNum){
            return minNum * maxNum / gcd(minNum, maxNum);
        };

        let minNum = Math.min(tNum1, tNum2);
        let maxNum = Math.max(tNum1, tNum2);
        let tGcd = gcd(minNum, maxNum);
        let tLcm = lcm(minNum, maxNum);
        return tLcm / scale;
    };
}
if (typeof Number.getStartVirtualNumber !== "function") {
    Number.getStartVirtualNumber = function(totalDataCount = 0, dataPerCount = 10, page = 1) {
        if (totalDataCount === 0) {
            return 0;
        }
        return totalDataCount - (dataPerCount * (page - 1));
    };
}
if (typeof Number.formatBytes !== "function") {
    Number.formatBytes = function(bytes, decimals = 2) {
        if (bytes === 0) {
            return '0 Bytes';
        }
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };
}
if (typeof Number.getRandomInt !== "function") {
    Number.getRandomInt = function(max = 1, min = 0) {
        return Math.floor(Math.random() * max) + min;
    };
}
if (typeof Number.percent !== "function") {
    Number.percent = function(total, slice) {
        if (total == 0 && slice ==0){
            return 0;
        }
        return Math.round((slice / total) * 100);
    };
}
if (typeof Number.max !== "function") {
    Number.max = function(data, key) {
        let checkArray = data.map(row => row[key]);
        return Math.max(...checkArray);
    };
}
if (typeof Number.min !== "function") {
    Number.min = function(data, key) {
        let checkArray = data.map(row => row[key]);
        return Math.min(...checkArray);
    };
}