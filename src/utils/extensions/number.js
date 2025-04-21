
/**
 * Number 객체 확장 유틸리티
 * @fileoverview
 * - Number 객체에 커스텀 메서드를 추가하여 기능 확장
 */

if (typeof Number.comma !== "function") {
    /**
     * 숫자에 천 단위 구분 기호(쉼표)를 추가하여 반환하는 함수
     *
     * @function
     * @param {number|string} number - 쉼표를 추가할 숫자 또는 숫자 형태의 문자열
     * @param {Object} [options={maximumFractionDigits: 4, useZero: false}] - 옵션 설정
     * @param {number} [options.maximumFractionDigits=4] - 소수점 최대 자리수
     * @param {boolean} [options.useZero=false] - 0 또는 null인 경우 표시 여부
     * @returns {string} 천 단위 구분 기호가 포함된 숫자 문자열
     *
     * @description
     * - `useZero`가 `false`일 경우, 숫자가 0이나 `null`이면 "-"를 반환
     * - `useZero`가 `true`일 경우, 0과 `null`도 쉼표가 있는 형식으로 반환
     */
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
    /**
     * 두 숫자의 최소공배수 계산 함수
     *
     * @function
     * @param {number} num1 - 첫 번째 숫자
     * @param {number} num2 - 두 번째 숫자
     * @param {number} [scale=1] - 스케일 조정 값 (기본값은 1)
     * @returns {number} 최소공배수
     *
     * @description
     * - 최대공약수(GCD)를 사용하여 두 숫자의 최소공배수(LCM)를 계산
     * - 최소공배수는 `num1 * num2 / GCD(num1, num2)`로 계산됨
     */
    Number.lcm = function(num1, num2, scale = 1) {
        const tNum1 = num1 * scale;
        const tNum2 = num2 * scale;
        // 최대공약수
        const gcd = function(minNum, maxNum){
            return (minNum % maxNum) === 0 ? maxNum : gcd(maxNum, minNum % maxNum);
        };
        // 최소공배수
        const lcm = function(minNum, maxNum){
            return minNum * maxNum / gcd(minNum, maxNum);
        };

        const minNum = Math.min(tNum1, tNum2);
        const maxNum = Math.max(tNum1, tNum2);
        // const tGcd = gcd(minNum, maxNum);
        const tLcm = lcm(minNum, maxNum);
        return tLcm / scale;
    };
}
if (typeof Number.getStartVirtualNumber !== "function") {
    /**
     * 페이지 번호에 따른 시작 가상 번호 계산 함수
     *
     * @function
     * @param {number} [totalDataCount=0] - 전체 데이터 개수
     * @param {number} [dataPerCount=10] - 페이지당 데이터 개수
     * @param {number} [page=1] - 현재 페이지 번호
     * @returns {number} 해당 페이지의 시작 가상 번호
     *
     * @description
     * - 예를 들어 100개의 데이터가 있고, 페이지당 10개의 데이터를 표시하는 경우,
     *   페이지 1은 100, 페이지 2는 90, 페이지 3은 80 등과 같이 시작 번호를 반환
     */
    Number.getStartVirtualNumber = function(totalDataCount = 0, dataPerCount = 10, page = 1) {
        if (totalDataCount === 0) {
            return 0;
        }
        return totalDataCount - (dataPerCount * (page - 1));
    };
}
if (typeof Number.formatBytes !== "function") {
    /**
     * 바이트 단위를 사람이 읽을 수 있는 형식으로 변환하는 함수
     *
     * @function
     * @param {number} bytes - 변환할 바이트 수
     * @param {number} [decimals=2] - 소수점 자리 수 (기본값은 2)
     * @returns {string} 사람이 읽을 수 있는 형식의 용량 문자열 (예: "10 KB", "1.2 MB")
     *
     * @description
     * - 바이트를 `KB`, `MB`, `GB` 등으로 변환하여 반환
     * - 소수점 자리 수를 지정할 수 있음
     */
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
    /**
     * 주어진 범위 내에서 랜덤 정수 생성 함수
     *
     * @function
     * @param {number} [max=1] - 생성할 랜덤 정수의 상한 값 (기본값 1)
     * @param {number} [min=0] - 생성할 랜덤 정수의 하한 값 (기본값 0)
     * @returns {number} 랜덤 정수
     *
     * @description
     * - `min`과 `max` 범위 내에서 랜덤 정수를 반환
     * - `max`는 포함되고, `min`은 포함되지 않음
     */
    Number.getRandomInt = function(max = 1, min = 0) {
        return Math.floor(Math.random() * max) + min;
    };
}
if (typeof Number.percent !== "function") {
    /**
     * 백분율 계산하는 함수
     *
     * @function
     * @param {number} total - 전체 값
     * @param {number} slice - 부분 값
     * @returns {number} 부분 값이 전체에서 차지하는 비율 (백분율)
     *
     * @description
     * - 부분 값 `slice`가 전체 값 `total`에서 차지하는 백분율을 계산
     * - 예: 전체 200 중 부분 50이면 25% 반환
     */
    Number.percent = function(total, slice) {
        if (total == 0 && slice ==0){
            return 0;
        }
        return Math.round((slice / total) * 100);
    };
}
if (typeof Number.max !== "function") {
    /**
     * 데이터 배열에서 최대값을 찾는 함수
     *
     * @function
     * @param {Array} data - 데이터 배열
     * @param {string} key - 비교할 속성 키
     * @returns {number} 최대값
     *
     * @description
     * - 주어진 배열에서 특정 키를 기준으로 최대값을 계산
     * - 배열의 객체가 기준이 되는 속성을 갖고 있어야 함
     */
    Number.max = function(data, key) {
        const checkArray = data.map(row => row[key]);
        return Math.max(...checkArray);
    };
}
if (typeof Number.min !== "function") {
    /**
     * 데이터 배열에서 최소값을 찾는 함수
     *
     * @function
     * @param {Array} data - 데이터 배열
     * @param {string} key - 비교할 속성 키
     * @returns {number} 최소값
     *
     * @description
     * - 주어진 배열에서 특정 키를 기준으로 최소값을 계산
     * - 배열의 객체가 기준이 되는 속성을 갖고 있어야 함
     */
    Number.min = function(data, key) {
        const checkArray = data.map(row => row[key]);
        return Math.min(...checkArray);
    };
}