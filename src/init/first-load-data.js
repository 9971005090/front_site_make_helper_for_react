// src/utils/initializeApp.js
const fetchAppData = async function() {

};

const FIRST_LOAD_DATA = async function() {
    try {
        // 초기 데이터 로딩
        await fetchAppData();
        return true;
    } catch (error) {
        console.error('앱 초기화 실패:', error);
        return false;
    }
};

export { FIRST_LOAD_DATA };
