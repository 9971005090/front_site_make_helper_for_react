import React from "react";

export const Controller = {
    index: function() {
        return function({ url, onLastLoad }) {
            React.useEffect(function() {
                onLastLoad();
            }, [url]);
            return "게이트웨이 페이지입니다.";
        };
    }
};
