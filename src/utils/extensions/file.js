// src/utils/extensions/file.js

/**
 * File object 확장
 */
if (typeof File.whatIsFileType !== "function") {
    /**
     * Whitespace 거나 NULL 이면 true 반환(현재 엑셀만)
     *
     * @param {string} text
     * @returns {boolean}
     */
    File.whatIsFileType = function (file) {
        const _isExcelFile = function(file) {
            const excelMimeTypes = [
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'application/vnd.ms-excel'
            ];
            return excelMimeTypes.includes(file.type);
        }
        return _isExcelFile(file) === true ? `excel` : `none`;
    };
}