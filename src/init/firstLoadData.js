// src/utils/initializeApp.js
const fetchAppData = async () => {

};

const firstLoadData = async () => {
    try {
        // 초기 데이터 로딩
        await fetchAppData();
        return true;
    } catch (error) {
        console.error('앱 초기화 실패:', error);
        return false;
    }
};

export default firstLoadData;
