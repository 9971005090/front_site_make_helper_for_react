
/**
 * rest api 응답 코드 전역 상수
 * @fileoverview
 * - 서버에서 반환하는 공통 응답 코드 정의
 * - 각 코드 값은 16진수(hex)로 표현됨
 */

const COMMON_RESPONSE_CODE = {
    'SUCCESS': 0x0000,
    'INVALID_PARAMETER': 0x0001,
    'DATABASE_ERROR': 0x0002,
    'ACCOUNT_INFO_FAIL': 0x0003,
    'AUTHORITY_ERROR': 0x0004,
    'INCORRECT_DATA': 0x0005,
    'SESSION_CLOSED': 0x00F1
};

export { COMMON_RESPONSE_CODE };