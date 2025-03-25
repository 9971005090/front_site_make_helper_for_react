// src/helpers/text.js
import React from "react";

/**
 * 텍스트에서 줄바꿈(\n)을 <br /> 태그로 변환하는 헬퍼 함수
 * @param {string} text - 변환할 문자열
 * @returns {React.ReactNode[]} - JSX 요소 배열 반환
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