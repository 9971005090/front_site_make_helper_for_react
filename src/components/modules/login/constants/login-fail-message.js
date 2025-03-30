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