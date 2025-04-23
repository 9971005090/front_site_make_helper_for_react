
/**
 * 엑셀 파일을 읽어 JSON 데이터로 변환 파일
 * @fileoverview
 * - 브라우저에서 엑셀 파일을 업로드하고 데이터를 JSON 형식으로 변환하여 제공
 */

import * as XLSX from "xlsx";

/**
 * 엑셀 파일을 읽어 JSON 데이터로 변환하는 함수
 * @function
 * @param {File} file - 사용자가 업로드한 엑셀 파일 (XLSX, XLS 형식)
 * @param {Function} [callback=null] - 변환된 데이터를 처리할 콜백 함수 (옵션)
 *
 * @description
 * - `FileReader`를 사용하여 엑셀 파일을 비동기적으로 읽어옴
 * - `XLSX.read`를 이용해 엑셀 데이터를 파싱
 * - 첫 번째 시트를 JSON 형식의 데이터로 변환
 * - 변환된 데이터를 콜백 함수로 전달하여 활용 가능
 *
 * @example
 * RUN(file, (data) => {
 *     console.log(data); // 변환된 JSON 데이터 출력
 * });
 */
const RUN = function(file, callback = null) {
    const reader = new FileReader();

    reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        // 첫 번째 시트 가져오기
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // 엑셀 데이터를 JSON 형태로 변환
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        callback(jsonData);
    };

    reader.readAsArrayBuffer(file);
};

export { RUN };