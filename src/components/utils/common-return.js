
/**
 * JSX 리턴을 공통화한 컴포넌트
 * @fileoverview
 * 동적으로 디자인 컴포넌트를 로딩하고 렌더링하는 부분이 여러 데이터 처리 컴포넌트에서 동일하게 사용되므로 이를 공통화함.
 */

import React from "react";
import { LoadingDonut } from "../../components/utils/loading-donut";
import { useVariable as useVariableNoRender } from "../../hooks/utils-no-render/variable";

/**
 * 공통 로딩 처리 함수
 * @param {React.Component} Component - 렌더링할 동적 컴포넌트
 * @returns {function} - 공통 렌더링을 수행하는 React 컴포넌트 함수
 */
const CommonReturn = function(Component) {
    /**
     * 공통 렌더링 컴포넌트
     * @param {object} props - 전달받은 속성값
     * @param {string} [props.loadingTypeTitle="Controller"] - 로딩 메시지에 표시될 타입 이름
     * @param {string|null} [props.uniqueKey=null] - 고유 키 값
     * @param {object} props.backUrl - 이전 URL 정보
     * @param {object} props.url - 현재 URL 정보
     * @returns {JSX.Element|null} - 적절한(조건은 소스에서 직접 확인) 컴포넌트 렌더링
     */
    const CommonReturnComponent = function({ loadingTypeTitle = `Controller`, uniqueKey = null, ...props }) {
        const { get: getVariable } = useVariableNoRender();
        // 1. 컴포넌트가 존재하고, props.backUrl이 없거나 props.backUrl이 있고, backUrl.controller 값이 null인 경우 렌더링
        if (String.isNullOrWhitespace(Component) === false && (Object.prototype.hasOwnProperty.call(props, `backUrl`) === false || (Object.prototype.hasOwnProperty.call(props, `backUrl`) === true && props.backUrl.controller === null))) {
            console.log("::::::: > rendering Component1:::::", Date.getNow());
            return (<Component key={uniqueKey} {...props} />);
        }
        // 2. props.backUrl과 props.url의 controller가 동일하면 렌더링
        if (String.isNullOrWhitespace(Component) === false && props.backUrl.controller === props.url.controller) {
            console.log("::::::: > rendering Component2:::::", Date.getNow());
            return (<Component key={uniqueKey} {...props} />);
        }
        // 3. 개발 환경이 아닌 경우, null 반환 (렌더링하지 않음)
        if (getVariable('APP.INFO.SERVICE_TYPE') !== 'DEVELOPMENT') {
            console.log("::::::: > rendering null:::::", Date.getNow());
            return null;
        }
        // 4. 디버깅 모드가 활성화된 경우, 로딩 메시지 표시
        if (getVariable('APP.INFO.DEBUG.USE') === true) {
            return (<div>Data {loadingTypeTitle} Loading...</div>);
        }

        // 5. 기본적으로 작은 로딩 표시
        return (<LoadingDonut />);
    };
    return (CommonReturnComponent);
};

export { CommonReturn };
