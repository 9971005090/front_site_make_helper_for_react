// src/helpers/parsingOrgan.js

export const numberToCurrency = function(number, options = {maximumFractionDigits: 4, useZero: true}) {
    return Number.comma(number, options);
};


