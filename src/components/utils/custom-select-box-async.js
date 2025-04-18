// src/components/utils/custom-select-box.js

import React from "react";
import ReactDOM from "react-dom/client";
import $ from "cash-dom";
import { stopBubbling } from "../../utils/stop-bubbling";
import { subscribeToRouteChange } from "../../hooks/route-change";
import {CommonReturn} from "./common-return";


const CustomSelectBoxAsync = function() {
    let container = null;
    let root = null;
    const CustomSelectBoxComponent = function({ options, now }) {
        const [Component, setComponent] = React.useState(null);

        const setAddEvent = async function() {
            ////////////////////////////////////////////////////////////////////

            ////////////////////////////////////////////////////////////////////
        };
        React.useEffect(function() {
            subscribeToRouteChange(handleRouteChange);

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
                $(this).parent().parent(`.select-box-for-${options.type}`).find(`.select-item`).val($(this).attr(`data-code`));
                $(this).parent().parent(`.select-box-for-${options.type}`).find(`.select-item`).trigger(`keyup`);
                // const selectObj = choiceBox.parent().parent(`.select-box-for-organ`);
                // const choiceCode = choiceBox.attr(`data-code`);
                // selectObj.children(`.select-item`).val(choiceCode);

                $(this).addClass("selected");
                if (options.callback !== null) {
                    options.callback($(this));
                }
            });
        }, [now]);

        // return CommonReturn(Component)({ paramFetchData: paramFetchData, loadingTypeTitle: `common-fetch`, now: now, onLoad: setAddEvent });
        const styles = `
            .search-form .cont .cm-select-box {
                display: block;
            }
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
                    <input type="hidden" className={`select-item ${options.attr["add-class"].join(" ")}`} name={options.attr.name} data-not-parsing-value={options.all !== null && options.all.isUse === false && options.all.code} value={options.all !== null ? options.all.code : options.default !== null && options.default.code} />

                    <button type="button" className={`select-box-label-for-${options.type} label`}>{options.all !== null ? options.all.title : options.default !== null && options.default.title}</button>
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
    };
    const run = async function(selector, options, ret = null) {
        if (ret === null) {
            container = $(selector)[0];
            root = ReactDOM.createRoot(container);
            root.render(
                <CustomSelectBoxComponent options={options} now={Date.getNow()} />
            );
        }
        else {
            ret.root.render(
                <CustomSelectBoxComponent options={options} now={Date.getNow()} key={Date.getNow()}/>
            );
        }
        return {root, container, close};
    };

    const handleRouteChange = function() {
        // 빠르게 처리가 되다보니, main 콤포넌트의 랜더링과 겹쳐 실행이 될 수 있다.
        // 그래서 최대한 늦춰서 실행되게. 결국 main 콤포넌트의 랜더링이 끝나고 실행될 수 있게
        setTimeout(function() {
            close();
        }, 100);
    };

    function close() {
        if (root !== null) {
            root.unmount();
            root = null;
        }
        if (container !== null) {
            container.remove();
            container = null;
        }
    }

    return {
        run: run,
        // close: close
    };
};

export { CustomSelectBoxAsync };