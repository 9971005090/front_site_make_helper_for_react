// src/components/modules/layout/index.js
import React from "react";

import { store } from "../../redux/slice/store";
import { useFirstLoad } from "../../hooks/first-load";
import { FIRST_LOAD_DATA } from "../../init/first-load-data";
// import { useAuth } from "../../hooks/auth";

const Pre = async function() {
    console.log(":::::Pre:::::", Date.getNow());
    // 랜더링이 안되려면 직접 조회해서 사용해야한다.
    const isAuthenticated = store.getState().auth._isAuthenticated;
    // console.log(":::::Pre:::::", Date.getNow());
    // const { isAuthenticated } = useAuth();
    const { isDone, setIsDone } = useFirstLoad();
    //
    // console.log("isDone1::::", isDone);
    if (isDone === false && isAuthenticated === true) {
        const _d = await FIRST_LOAD_DATA();
        setIsDone(_d);
    }
};

export { Pre };