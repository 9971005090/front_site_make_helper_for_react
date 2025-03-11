const APP = {
    'APP.VERSION.REAL': '0.0.6-20250211.1518',
    'APP.VERSION.VIEW': '1.0.0',
    'APP.IS_AUTH': true,
    'APP.THEME': `default`,
    'APP.INFO.SERVICE_TYPE': null,
    'APP.INFO.DEBUG.USE': false,
    'APP.INFO.ON_PREMISE': false,
    'APP.API_BASE': `https://www.dev-api.seersthync.com/mobiCAREConsole/API`,
    'APP.DEFAULT_URI': {
        'CONTROLLER': `organ`,
        'ACTION': 'index'
    },
    'APP.LAYOUT.IGNORE_CONTROLLER_NAMES': [`login`]
};

// 아래 영역에 custom 함수 재정의, 전역 변수 코드 작성
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 대시보드 도메인인지 확인하여, 기본 링크 변경
const _isOnPremisesDomain = function() {
    if (location.hostname.indexOf('.mex-us.kr') !== -1) {
        return true;
    }
    return false;
};
// on-premises 가정
const _setOnPremisesApiDomain = function() {
    if (location.origin.indexOf(`https`) !== -1) {
        APP['APP.API_BASE'] = `https://192.168.0.1:8443/mobiCAREConsole/API`;
    }
    else {
        APP['APP.API_BASE'] = `http://192.168.0.1:8080/mobiCAREConsole/API`;
    }
};

if((location.hostname.indexOf('localhost') !== -1 || location.hostname.indexOf("127.0.0.1") !== -1 || location.hostname.indexOf('staging-') !== -1 || location.hostname.indexOf('seersipm') !== -1 || location.hostname.indexOf('dev') !== -1) === false) {
    // showSiteLoadingLog(` 운영 서버 `, `#1e4df8`, `#ffffff`);
    APP['APP.INFO.SERVICE_TYPE'] = `RELEASE`;
    APP['APP.API_BASE'] = "https://www.api.seersthync.com/mobiCAREConsole/API";   // release
    APP['INFO.DEBUG.USE'] = false;

    // 추가 내용 정리
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if (location.hostname.indexOf("10.") !== -1 || location.hostname.indexOf("192.") !== -1 || _isOnPremisesDomain() === true) {
        // 내부망에 https 구축을 해달라고 할때, 같은 도메인을 쓴다고 가정 해서 처리
        // 온프라미스에서 포트번호를 달리해서 사용하는 경우도 있어서
        // origin 는 프로토콜 + 호스트이름 + 포트
        if (location.origin.indexOf(`https`) !== -1) {
            APP['APP.API_BASE'] = `https://${location.hostname}:8443/mobiCAREConsole/API`;
        }
        else {
            APP['APP.API_BASE'] = `http://${location.hostname}:8080/mobiCAREConsole/API`;
        }
        if (_isOnPremisesDomain() === true) {
            _setOnPremisesApiDomain();
        }
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
else if(location.hostname.indexOf('staging-') !== -1) {
    APP['APP.INFO.SERVICE_TYPE'] = `STAGING`;
    APP['APP.API_BASE'] = "https://www.api.seersthync.com/mobiCAREConsole/API";   // release
    APP['INFO.DEBUG.USE'] = true;

    // 추가 내용 정리
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
else {
    APP['APP.INFO.SERVICE_TYPE'] = `RELEASE`;
    // APP['APP.API_BASE'] = "https://www.api.seersthync.com/mobiCAREConsole/API";   // release
    APP['APP.API_BASE'] = "https://www.dev-api.seersthync.com/mobiCAREConsole/API";   // test
    APP['INFO.DEBUG.USE'] = true;

    // 추가 내용 정리
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 서비스 on-premise로 설치 후 localhost로 확인시 사용
    if (APP['APP.INFO.ON_PREMISE'] === true) {
        APP['APP.API_BASE'] = `localhost:8080/mobiCAREConsole/API`;
        APP['INFO.DEBUG.USE'] = false;
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export { APP };