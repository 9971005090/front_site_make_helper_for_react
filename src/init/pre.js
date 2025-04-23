
/**
 * 기능 처리가 시작전 실행되는 전처리 파일
 * @fileoverview
 * - 특정 시점(예: 기능이 시작되는 시점)에서 실행되는 전처리 작업을 정의
 * - 현재는 사용자가 인증된 상태이며, 초기 데이터가 로드되지 않은 경우 초기 데이터를 로딩하는 역할 수행
 */

import { useFirstLoad } from "../hooks/first-load";
import { FIRST_LOAD_DATA } from "../init/first-load-data";
import { useAuth as useAuthNoRender } from "../hooks/utils-no-render/auth";

/**
 * 전처리 함수
 * @async
 * @description
 * - 사이트가 렌더링되기 전에 실행되며, 초기 데이터 로딩이 필요한 경우 데이터를 불러옴
 * - 사용자 인증 상태(isAuthenticated)를 확인하여, 인증된 경우만 데이터를 로드
 * - 데이터 로딩이 완료되면 상태 값을 업데이트
 */
const Pre = async function() {
    console.log(":::::Pre:::::", Date.getNow());
    // SiteRendering.run();
    // 기본 데이타 조회(로그인 후 또는 로그인 상태에서 사이트 로그인 말고 다른 주소를 바로 접속시)
    const { isAuthenticated } = useAuthNoRender();
    const { isDone, setIsDone } = useFirstLoad();
    // if ($(`#site-rendering`).length <= 0) {
    //     LOADING_STATUS();
    // }
    if (isDone === false && isAuthenticated === true) {
        const _d = await FIRST_LOAD_DATA();
        setIsDone(_d);
    }
};

export { Pre };