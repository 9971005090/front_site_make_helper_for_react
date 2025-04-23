
/**
 * 사이트별 초기 데이타 로드 처리 파일
 * @fileoverview
 * - 사이트 최초 접속 또는 로그인 후 필요한 초기 데이터를 가져오는 기능을 제공
 */

import { POST } from "../utils/axios-api";
import { RUN as GATEWAY_FAKE_API_RUN } from "../constants/fake-api/gateway";

/**
 * 실질적인 초기 데이타를 로딩 처리하는 함수
 * @async
 * @description
 * - 현재는 예시로 간단한 레스트 api 조회만 처리함
  *
 * @returns {<Object>} API 응답 데이터 반환
 */
const fetchAppData = async function() {
    // GATEWAY_FAKE_API_RUN();
    const passingParams = {
        pageNumber: 1,
        count: 5
    };
    const response = await POST(`/Manager/SelectGatewayInfoPage`, passingParams, {});
    return response;
};

/**
 * 초기 데이터 로딩을 수행하는 함수
 * @description
 * - 다른 파일에서 사용될 때 초기 데이터를 로드하는 진입점 역할을 수행
 * - 내부적으로 `fetchAppData`를 호출하여 데이터를 가져옴
 * - 실패 시 `false`를 반환하여 예외 처리 가능
 *
 * @returns {<Object|boolean>} 성공 시 결과 데이터 반환, 실패 시 false 반환
 */
const FIRST_LOAD_DATA = async function() {
    try {
        // 초기 데이터 로딩
        const response = await fetchAppData();
        return response.result;
    } catch (error) {
        console.error('앱 초기화 실패:', error);
        return false;
    }
};

export { FIRST_LOAD_DATA };
