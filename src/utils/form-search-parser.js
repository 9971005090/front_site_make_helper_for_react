// src/utils/form-search-parser.js
import $ from "cash-dom";

const formSearchParser = function(selector, useColumnSelector = `.use-option`) {
    const _notParsingValueCheck = function(choiceObject) {
        return choiceObject.attr(`data-not-parsing-value`) === String.getValidValue(choiceObject.val());
    };
    const form = {};

    $(selector)
        .find(useColumnSelector)
        .each(function (i) {
            const name = $(this).attr(`name`);

            form[name] = _notParsingValueCheck($(selector).find(`[name="${name}"]`)) === true ? null : String.getValidValue($(selector).find(`[name="${name}"]`).val());
            if ($(selector).find(`[name="${name}"]`).attr(`type`) === `radio` || $(selector).find(`[name="${name}"]`).attr(`type`) === `checkbox`) {
                form[name] = _notParsingValueCheck($(selector).find(`[name="${name}"]:checked`)) === true ? null : String.getValidValue($(selector).find(`[name="${name}"]:checked`).val());
            }
        });

    return form;
};

export { formSearchParser };
