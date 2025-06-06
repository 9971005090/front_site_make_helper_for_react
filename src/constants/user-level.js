
/**
 * 사이트에서 사용되는 계정 권한 상수
 * @fileoverview
 * - 사이트에서 사용되는 계정 권한 정보 정의
 * - 각 계정 유형별 코드 및 문자열 매핑
 * - 특정 권한 제한 처리 정보 포함
 */

const USER = {
    'LEVEL': {
        'CODE': {
            'PATIENT': 1,
            'NURSE': 2,
            'DOCTOR': 5,
            'MANAGER': 8,
            'ADMIN': 14,
            'SYSTEM_ADMIN': 20,
        },
        'STRING': {}
    },
    'INIT': function() {
        USER.LEVEL.STRING[USER.LEVEL.CODE.PATIENT] = `환자`;
        USER.LEVEL.STRING[USER.LEVEL.CODE.NURSE] = `간호사`;
        USER.LEVEL.STRING[USER.LEVEL.CODE.DOCTOR] = `의사`;
        USER.LEVEL.STRING[USER.LEVEL.CODE.MANAGER] = `매니저`;
        USER.LEVEL.STRING[USER.LEVEL.CODE.ADMIN] = `관리자`;
        USER.LEVEL.STRING[USER.LEVEL.CODE.SYSTEM_ADMIN] = `시스템 관리자`;
        USER.LIMIT.LEVEL.push(USER.LEVEL.CODE.SYSTEM_ADMIN);
    },
    'IGNORE_ID': [`admin`],
    'LIMIT': {
        'MESSAGE': `시스템 관리자만 접속할 수 있습니다!`,
        'LEVEL': []
    }
};
USER.INIT();
export { USER };