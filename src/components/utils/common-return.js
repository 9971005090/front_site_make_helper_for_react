// src/components/utils/common-return.js
import React from "react";
import { LoadingDonut } from "../../components/utils/loading-donut";

// 공통 로딩 함수
const CommonReturn = function(Component) {
    const CommonReturnComponent = function({ loadingTypeTitle = `Controller`, uniqueKey = null, ...props }) {
        if (String.isNullOrWhitespace(Component) === false && Object.prototype.hasOwnProperty.call(props, `backController`) === false) {
            return (<Component key={uniqueKey} {...props} />);
        }
        if (String.isNullOrWhitespace(Component) === false && props.backController === props.url.controller) {
            return (<Component key={uniqueKey} {...props} />);
        }
        if (window.CONSTANTS.get('APP.INFO.SERVICE_TYPE') !== 'DEVELOPMENT') {
            return null;
        }
        if (window.CONSTANTS.get('APP.INFO.DEBUG.USE') === true) {
            return (<div>Data {loadingTypeTitle} Loading...</div>);
        }
        return (<LoadingDonut />);
    };
    return (CommonReturnComponent);
};

export { CommonReturn };
