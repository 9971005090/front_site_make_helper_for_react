
/**
 * 시작 파일
 * @fileoverview
 * 1. 초기 설정(INITIALIZE_APP())
 *    - 내장 객체에 확장 함수 등록
 *    - 앱 전역 상수 등록(리덕스 관리가 아닌 window 객체에서 자체 관리): Array, Date, File, Number, String
 *      - 앱 관련 상수, 계정 권한 상수, rest api 결과 코드 상, 사이트에서 사용할 환경 변수 관련 상수
 * 2. 루트 콤포넌트인 App 랜더링
 *
 * # 개발 방향
 * - 라우터는 동적(url을 분석하여 처리)으로 처리
 * - 콤포넌트안에 같이 포함된 디자인 내용을 콤포넌트로 분리하고, 디자인에 있던 이벤트 부분 처리를 데이타 처리 콤포넌트에서 진행
 *   1) 데이타 처리 콤포넌트
 *      - 디자인을 제외한 데이터 처리 후 디자인 콤포넌트가 로딩 완료되면, 각 디자인에서 필요한 이벤트를 등록 처리
 */

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./redux/slice/store";

import { INITIALIZE_APP } from './init/initialize-app';
import { LoadingDonut } from "./components/utils/loading-donut";
import { APP as APP_CONSTANTS } from "./constants/app";

import { format } from 'date-fns';
import './Css';

const Root = function() {
    /**
     * 사이트 로딩 전 필수 파일, 함수, 전역변수, 환경변수 로딩 완료 여부 체크 변수
     * @type {boolean}
     */
    console.log(":::::index:::::", format(new Date(), `yyyy-MM-dd HH:mm:ss.SSS`));
    const [ isDone, setIsDone ] = React.useState(false);

    /**
     * 사이트 로딩 전 필수 파일, 함수, 전역변수 로딩 처리 함수
     */
    React.useEffect(function() {
        (async function() {
            try {
                await INITIALIZE_APP();
                setIsDone(true);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);


    if (isDone === false) {
        if (APP_CONSTANTS['APP.INFO.DEBUG.USE'] === `DEVELOPMENT`) {
            return <>Loading site...</> ;
        }
        else {
            return <LoadingDonut />;
        }
    }

    return <App />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <Root />
    </Provider>
);
