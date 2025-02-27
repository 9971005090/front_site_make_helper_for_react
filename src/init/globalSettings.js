import React from "react";
import firstLoadData from "./firstLoadData";
import { useAuth } from "../hooks/auth";

const settings = () => {
    const [layoutComponent, setLayoutComponent] = React.useState(null);
    const [_isFirstLoadDataDone, _setIsFirstLoadData] = React.useState(false);
    const firstRender = React.useRef(true); // 최초 실행 여부를 추적
    const { isAuthenticated } = useAuth();
    const runFirstLoadData = async () => {
        if (isAuthenticated === true) {
            const isDone = await firstLoadData();
            _setIsFirstLoadData(isDone); // 초기화 여부 설정
        }
        else {
            _setIsFirstLoadData(true); // 초기화 여부 설정
        }
    };
    const isFirstLoadDataDone = function() {
        return _isFirstLoadDataDone;
    };
    const setFirstRender = function(value) {
        firstRender.current = value;
    };
    const isFirstRender = function(value) {
        firstRender.current = value;
    };

    return { layoutComponent, setLayoutComponent, setFirstRender, isFirstRender, isFirstLoadDataDone, runFirstLoadData };
};

export default settings;