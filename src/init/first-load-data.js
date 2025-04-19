// src/init/first-load-data.js
import { POST } from "../utils/axios-api";
import { RUN as GATEWAY_FAKE_API_RUN } from "../constants/fake-api/gateway";

const fetchAppData = async function() {
    // GATEWAY_FAKE_API_RUN();
    const passingParams = {
        pageNumber: 1,
        count: 5
    };
    const response = await POST(`/Manager/SelectGatewayInfoPage`, passingParams, {});
    return response;
};

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
