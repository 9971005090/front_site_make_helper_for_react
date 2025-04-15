// /src/init/global-settings.js
import React from "react";
import { FIRST_LOAD_DATA } from "./first-load-data";



const SETTINGS = function() {
    const runFirstLoadData = async function() {
        const isDone = await FIRST_LOAD_DATA();
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