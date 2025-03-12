// src/utils/formParser.js
import $ from "cash-dom";

const formParser = function (formSelector) {
    const form = {};

    $(`${formSelector}`)
        .find("input, select, textarea")
        .each(function () {
            const name = $(this).attr("name");
            if (!name) return; // name 속성이 없는 경우 건너뜀

            form[name] = String.getValidValue($(this).val());
            if ($(this).attr("type") === "radio" || $(this).attr("type") === "checkbox") {
                form[name] = $(`${formSelector}`).find(`[name="${name}"]:checked`).val() || null;
            }
        });

    return form;
};

export { formParser };
