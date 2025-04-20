
/**
 * 로그인 실패시 사용하는 메세지 정의 상수 파일
 * @fileoverview
 * 로그인 실패시 사용하는 메세지 정의 상수 파일
 *
 * @example
 * - 해당 파일 임포트 후 GET 실행시 파라미터로 서버에서 받은 코드를 전달
 */

const LOGIN_FAIL = {
    TYPE: "normal", // normal(실패만 알려줌), detail(자세히 알려줌)
    CODE: {
        NULL: "Account is null",
        INCORRECT: "The password is incorrect",
        BOTH: []
    },
    MESSAGE: {
        NULL: "계정이 존재하지 않습니다. 아이디와 비밀번호를 정확하게 입력하세요!",
        INCORRECT: "비밀번호가 정확하지 않습니다. 비밀번호를 정확하게 입력하세요!",
        BOTH: null,
        NORMAL: `로그인에 실패했습니다. 아이디와 비밀번호를 정확하게 입력하세요!`
    },

    /**
     * 메세지 조회 함수
     *
     * @param {string} code - 에러 코드 문자열(예: The password is incorrect ~~~~~~)
     *
     * @description
     *  - 서버에서 내려준 에러코드 또는 메세지에서 정의한 CODE 상수가 포함됐는지 확인 후 해당 코드에 대응되는 메세지를 응답
     *
     * @example
     * import { LOGIN_FAIL as LOGIN_FAIL_MESSAGE } from "./constants/login-fail-message";
     * const _r = await runLogin(form);
     * if (_r.result === false) {
     *  if (String.isNullOrWhitespace(_r.code) === false) {
     *      Notify(`top-center`, LOGIN_FAIL_MESSAGE.GET(_r.code), `error`);
     *  }
     *  isFormSubmit(`#dataForm`, `end`);
     * }
     *
     * @returns {string} msg - 주어진 코드에 대응되는 에러 메시지
     */
    GET: function(code) {
        let msg = LOGIN_FAIL.MESSAGE.BOTH;
        if (LOGIN_FAIL.TYPE === `detail`) {
            if(code.indexOf(LOGIN_FAIL.CODE.NULL) !== -1) {
                msg = LOGIN_FAIL.MESSAGE.NULL;
            }
            else if(code.indexOf(LOGIN_FAIL.CODE.INCORRECT) !== -1) {
                msg = LOGIN_FAIL.MESSAGE.INCORRECT;
            }
        }
        else {
            msg = LOGIN_FAIL.MESSAGE.NORMAL;
        }
        return msg;
    }
};
export { LOGIN_FAIL };