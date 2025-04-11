// src/components/utils/custom-select-box.js

import React from "react";
import $ from "cash-dom";
import { stopBubbling } from "../../utils/stop-bubbling";

const CustomSelectBox = React.memo(function CustomSelectBox({ options }) {
    console.log("options::::", options);
    React.useEffect(function() {

        $(`.select-box-for-${options.type}`).off(`click`).on(`click`, function(e) {
            stopBubbling(e);
            $(this).toggleClass(`selected`);
            $(this).children(`.select-box-for-${options.type} .select-box-option-list-for-${options.type}`).css("top",-3);
            $(this).children(`.select-box-for-${options.type} .select-box-option-list-for-${options.type}`).width($(this).width());
            $(this).children(`.select-box-for-${options.type} .select-box-option-list-for-${options.type}`).toggle();
            if ($(this).find(`.option-item`).length > 0) {
                for (let i = 0; i < $(this).find(`.option-item`).length; i++) {
                    if ($(this).find(`.option-item`).eq(i).text() === $(this).find(`.label`).text()) {
                        $(this).find(`.option-item`).eq(i).addClass(`selected`);
                    }
                }
            }
        });

        $(`.select-box-for-${options.type} .select-box-option-item-for-${options.type}`).off(`click`).on(`click`, function(e) {
            stopBubbling(e);
            $(`.select-box-for-${options.type} .select-box-option-item-for-${options.type}`).removeClass("selected");
            $(this).parent().parent(`.select-box-for-${options.type}`).removeClass(`selected`);
            $(this).parent(`.select-box-for-${options.type} .select-box-option-list-for-${options.type}`).toggle();
            $(this).parent().parent(`.select-box-for-${options.type}`).find(`.select-box-for-${options.type} .select-box-label-for-${options.type}`).text($(this).text());
            $(this).addClass("selected");
            // if (optionItemClickCallback !== null) {
            //     optionItemClickCallback($(this), addParam);
            // }
        });
        
    }, []);

    // 스타일 정의
    const styles = `
        .select-box-for-${options.type} {
            width: ${options.size.width}px !important;
            height: ${options.size.height}px;
            margin-left: ${options.size['margin-left']}px;
        }
    `;
    return (
        <>
            <style>{styles}</style>
            <div className={`select-box-for-${options.type} cm-select-box`} id={`select-box-for-${options.type}`}>
                <input type="hidden" className={`select-item ${options.attr["add-class"].join(" ")}`} name={options.attr.name} data-not-parsing-value={options.all.isUse === false && options.all.code} value={options.all !== null && options.all.code} />
                <button type="button" className={`select-box-label-for-${options.type} label`}>{options.all !== null && options.all.title}</button>
                <ul className={`select-box-option-list-for-${options.type} option-list`}>
                    {options.all !== null && (
                        <li className={`select-box-option-item-for-${options.type} option-item`} data-type={options.type} data-code={options.all.code}>{options.all.title}</li>
                    )}
                    {options.datas !== null && Object.entries(options.datas).map(([key, value], index) => (
                        <li key={index} className={`select-box-option-item-for-${options.type} option-item`} data-type={options.type} data-code={key}>{value}</li>
                    ))}
                </ul>
            </div>
        </>
    );
});

export { CustomSelectBox };