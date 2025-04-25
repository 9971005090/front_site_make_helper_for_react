

import { useVariable as useVariableNoRender } from "../../../../hooks/utils-no-render/variable";
const { get: getVariable, set: setVariable } = useVariableNoRender();

/**
 * 로그인에서 사용하는 rest api 주소에 대응하는 응답 상수 정의 파일
 * @fileoverview
 * - 백엔드에서 rest api 개발이 늦어질때 가상의 응답을 만들어 ui 를 개발하기 위한 상수
 *
 * @example
 * - 해당 파일 임포트 후 RUN 실행
 * import { RUN as LOGIN_API_RUN } from "../../../components/modules/login/constants/fake-api";
 * LOGIN_API_RUN();
 */

const FAKE_API = {
    '/Account/LoginHIS': {
        "result": true,
        "extra": null,
        "error": 0,
        "message": null,
        "remoteIp": "000.000.000.000",
        "accessToken": "TEST_sa.test.member_20250318140903858_5I38FN4V_TOKEN_WEB",
        "userAccount": {
            "id": "sa.test.member",
            "password": null,
            "organizationCode": "TEST",
            "userCode": "TEST_sa.test.member",
            "employeeCode": null,
            "department": null,
            "position": null,
            "level": 20,
            "name": "test",
            "gender": 0,
            "birthday": null,
            "phoneNumber": null,
            "email": "test.member@seerstech.com",
            "status": 0,
            "dateTime": "2024-07-24 14:28:35",
            "gmtCode": "GMT+0900",
            "timezone": "Asia/Seoul",
            "updateDateTime": null,
            "lastUpdatePwDateTime": "2024-07-24 14:28:35",
            "modifyPwAlertDateTime": null,
            "deactivateDateTime": null,
            "organizationName": "테스트",
            "profilePhotoUrl": null,
            "wardSimple": null
        },
        "organization": {
            "organizationId": 12,
            "organizationCode": "TEST",
            "organizationType": 0,
            "organizationInfo": "테스트3",
            "systemManager": "teo.kang@seerstech.com",
            "syncHis": 1,
            "deviceManagerType": 0,
            "organizationName": "테스트",
            "countryCode": "KR",
            "countryName": "Republic of Korea",
            "state": "",
            "city": "",
            "address": "",
            "latitude": 0,
            "longitude": 0,
            "phoneNumber": "",
            "level": 10,
            "expiration": 0,
            "expirationDateTime": "2220-10-27 12:04:24",
            "dateTime": "2021-12-28 17:37:24",
            "gmtCode": "GMT+0900",
            "timezone": "Asia/Seoul",
            "etc": "test",
            "themeType": 0,
            "userColor": null,
            "userGradient1": null,
            "userGradient2": null,
            "measurementDate": 20,
            "hideName": 2,
            "hideNameType": "*"
        },
        "apiServerInfoList": null,
        "loginFailCount": 0,
        "loginFailMaxCount": 0
    }
};
const RUN = function() {
    for (const key in FAKE_API) {
        setVariable(`${getVariable(`APP.API_BASE`)}${key}`, FAKE_API[key], true);
    }
};
export { RUN };