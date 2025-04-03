// /src/init/global-settings.js
import React from "react";
import { FIRST_LOAD_DATA } from "./first-load-data";
import { useAuth } from "../hooks/auth";
import { useFirstLoad } from "../hooks/first-load";

const SETTINGS = function() {
    // const [layoutComponent, setLayoutComponent] = React.useState(null);
    // const [_isFirstLoadDataDone, _setIsFirstLoadData] = React.useState(false);
    // const firstRender = React.useRef(true); // 최초 실행 여부를 추적
    const { isAuthenticated } = useAuth();
    const { setIsDone } = useFirstLoad();
    const runFirstLoadData = async function() {
        if (isAuthenticated === true) {
            const isDone = await FIRST_LOAD_DATA();
            setIsDone(isDone); // 초기화 여부 설정
        }
        else {
            setIsDone(true); // 초기화 여부 설정
        }
    };
    // const isFirstLoadDataDone = function() {
    //     return isDone;
    // };
    // const setFirstRender = function(value) {
    //     firstRender.current = value;
    // };
    // const isFirstRender = function(value) {
    //     firstRender.current = value;
    // };

    return { runFirstLoadData };
};

export { SETTINGS };