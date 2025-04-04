// src/components/controllers/pre.js

import { useFirstLoad } from "../../hooks/first-load";
import { FIRST_LOAD_DATA } from "../../init/first-load-data";
import { useAuth as useAuthNoRender } from "../../hooks/utils-no-render/auth";

const Pre = async function() {
    console.log(":::::Pre:::::", Date.getNow());
    const { isAuthenticated } = useAuthNoRender();
    const { isDone, setIsDone } = useFirstLoad();
    if (isDone === false && isAuthenticated === true) {
        const _d = await FIRST_LOAD_DATA();
        setIsDone(_d);
    }
};

export { Pre };