// src/components/utils/common-return.js
import React from "react";
import { LoadingDonut } from "../../components/utils/loading-donut";

// 공통 로딩 함수
const CommonReturn = function(Component) {
    const CommonReturnComponent = function({ loadingTypeTitle = `Controller`, uniqueKey = null, ...props }) {
        if (String.isNullOrWhitespace(Component) === false && (Object.prototype.hasOwnProperty.call(props, `backUrl`) === false || (Object.prototype.hasOwnProperty.call(props, `backUrl`) === true && props.backUrl.controller === null))) {
            console.log("::::::: > rendering Component1:::::", Date.getNow());
            return (<Component key={uniqueKey} {...props} />);
        }
        if (String.isNullOrWhitespace(Component) === false && props.backUrl.controller === props.url.controller) {
            console.log("::::::: > rendering Component2:::::", Date.getNow());
            return (<Component key={uniqueKey} {...props} />);
        }
        if (window.CONSTANTS.get('APP.INFO.SERVICE_TYPE') !== 'DEVELOPMENT') {
            console.log("::::::: > rendering null:::::", Date.getNow());
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
