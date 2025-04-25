
/**
 * File 객체 확장 유틸리티
 * @fileoverview
 * - File 객체에 커스텀 메서드를 추가하여 기능 확장
 */

if (typeof File.whatIsFileType !== "function") {
    /**
     * 파일 타입을 판별하는 함수
     * - 현재 엑셀 파일인지 확인하고, 엑셀 파일인 경우 `excel` 반환
     * - 엑셀 파일이 아닌 경우 `none` 반환
     *
     * @function
     * @param {File} file - 확인하려는 파일 객체
     * @returns {string} 파일 타입 (엑셀 파일인 경우 `excel`, 그 외는 `none`)
     *
     * @description
     * - 파일의 MIME 타입을 검사하여 엑셀 파일인지 확인
     * - 엑셀 파일 타입을 판단하는 MIME 타입 목록:
     *   - 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
     *   - 'application/vnd.ms-excel'
     */
    File.whatIsFileType = function (file) {
        const _isExcelFile = function(file) {
            const excelMimeTypes = [
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'application/vnd.ms-excel'
            ];
            return excelMimeTypes.includes(file.type);
        };
        return _isExcelFile(file) === true ? `excel` : `none`;
    };
}