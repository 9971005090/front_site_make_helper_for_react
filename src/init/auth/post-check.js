// js/init/auth/post-check.js
import { Notify } from '../../utils/global-utils';

/**
 * 추가적인 인증 검사 함수
 *
 * @typedef {Object} ErrorObject
 * @property {boolean} isUse - 에러 처리 여부 (기본값: false)
 * @property {string|null} msg - 에러 메세지 (기본값: null)
 *
 * @param {number} userLevel - 체크하려는 계정의 권한
 * @param {ErrorObject} [error={isUse: false, msg: null}] - (선택적) 에러 객체 (기본값: {isUse: false, msg: null})
 *
 * @description
 *  - 추가적인 인증 검사를 진행한다.
 *  - 예) 도메인을 공유하고 사이트가 다를 경우 계정 권한별 접속 제한처리
 *  - 함수 안에 `///~~~~///` 이 주석 사이에 필요한 코드를 넣는다.
 *
 * @example
 *  const error = { isUse: true, msg: "접속 권한이 없습니다." };
 *  const result = POST_CHECK(3, error); // 결과: 'AUTH_FAIL', 에러 메시지 Notify 콤포넌트로 출력됨
 *
 * @returns {"OK"|"AUTH_FAIL"} 인증 결과 ("OK" 또는 "AUTH_FAIL")
 */
const POST_CHECK = function(userLevel, error = {isUse: false, msg: null}) {
    let response = `OK`;

    // 아래 영역에 코드 작성
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    if (window.CONSTANTS.get(`APP.USER_LIMIT`).LEVEL.indexOf(userLevel) === -1) {
        response = `AUTH_FAIL`;
        if (error.isUse === true) {
            error.msg = error.msg === null ? window.CONSTANTS.get(`APP.USER_LIMIT`).MESSAGE : error.msg;
            Notify(`top-center`, error.msg, `error`);
        }
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    return response;
};

export { POST_CHECK };
