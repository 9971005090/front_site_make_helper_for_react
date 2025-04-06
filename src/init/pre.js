// src/components/controllers/pre.js

import { useFirstLoad } from "../hooks/first-load";
import { FIRST_LOAD_DATA } from "../init/first-load-data";
import { useAuth as useAuthNoRender } from "../hooks/utils-no-render/auth";

const Pre = async function() {
    console.log(":::::Pre:::::", Date.getNow());

    // 기본 데이타 조회(로그인 후 또는 로그인 상태에서 사이트 로그인 말고 다른 주소를 바로 접속시)
    const { isAuthenticated } = useAuthNoRender();
    const { isDone, setIsDone } = useFirstLoad();
    if (isDone === false && isAuthenticated === true) {
        const _d = await FIRST_LOAD_DATA();
        setIsDone(_d);
    }
};

export { Pre };