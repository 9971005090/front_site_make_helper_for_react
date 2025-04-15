// src/utils/excel-import/index

import * as XLSX from "xlsx";

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