
/**
 * 텍스트 관련 헬퍼 함수 모음
 * @fileoverview
 * - 텍스트에서 줄바꿈(\n)을 <br /> 태그로 변환하는 함수 포함
 */

import React from "react";

/**
 * 텍스트에서 줄바꿈(\n)을 <br /> 태그로 변환하는 헬퍼 함수
 * @param {string} text - 변환할 문자열
 * @returns {React.ReactNode[]} - JSX 요소 배열 반환
 * - 줄바꿈을 <br /> 태그로 변환하여 반환
 * - 텍스트가 비어 있거나 공백일 경우 null 반환
 */
const nl2br = function(text = ``) {
    if (String.isNullOrWhitespace(text) === true) {
        return null;
    }
    return text.split(`\n`).map((line, index) => (
        <React.Fragment key={index}>
            {line}
            <br />
        </React.Fragment>
    ));
};

export { nl2br };