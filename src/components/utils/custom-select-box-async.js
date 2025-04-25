
/**
 * 커스텀 셀렉트 박스를 구현하는 비동기 컴포넌트
 * @fileoverview
 * 기존 HTML 셀렉트 박스를 대체하는 스타일링되고 이벤트가 포함된 셀렉트 박스를 제공
 *
 */

import React from "react";
import ReactDOM from "react-dom/client";
import $ from "cash-dom";
import { stopBubbling } from "../../utils/stop-bubbling";
// import { subscribeToRouteChange } from "../../hooks/route-change";

/**
 * 커스텀 셀렉트 박스를 비동기적으로 생성하는 함수
 */
let container = {};
let root = {};
const CustomSelectBoxAsync = function() {
    let keyString = null;

    /**
     * 커스텀 셀렉트 박스를 렌더링하는 컴포넌트
     * @param {Object} props - 컴포넌트 속성
     * @param {Object} props.options - 셀렉트 박스 설정 정보
     * @param {number} props.now - 현재 시간 값 (리렌더링을 위한 키)
     * @returns {JSX.Element} - 커스텀 셀렉트 박스 컴포넌트
     */
    const CustomSelectBoxComponent = function({ options, now }) {
        const setAddEvent = async function() {
            ////////////////////////////////////////////////////////////////////

            ////////////////////////////////////////////////////////////////////
        };
        React.useEffect(function() {
            Array.routeChangeCallbackForObject(keyString, handleRouteChange, [keyString]);

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

    /**
     * 커스텀 셀렉트 박스를 특정 요소(selector)에 마운트하는 함수
     * @param {string} selector - 셀렉트 박스를 마운트할 DOM 요소 선택자
     * @param {Object} options - 셀렉트 박스 설정 정보
     * @param {Object|null} ret - 기존 root/container 객체 (기존 UI 갱신 시 사용)
     * @returns {Object} - 생성된 root 및 container 정보, unmout 처리하는 close 함수
     */
    const run = async function(selector, options) {
        console.log("selector:::::", selector);
        keyString = selector;
        if (Object.prototype.hasOwnProperty.call(container, selector) === false) {
            console.log("::::: non exist :::::");
            container[selector] = $(selector)[0];
            root[selector] = ReactDOM.createRoot(container[selector]);
            root[selector].render(
                <CustomSelectBoxComponent options={options} now={Date.getNow()} />
            );
        }
        else {
            root[selector].render(
                <CustomSelectBoxComponent options={options} now={Date.getNow()} key={Date.getNow()}/>
            );
        }
        return {root: root[selector], container: container[selector], close: close};
    };

    const handleRouteChange = function(keyString) {
        // 빠르게 처리가 되다보니, main 콤포넌트의 랜더링과 겹쳐 실행이 될 수 있다.
        // 그래서 최대한 늦춰서 실행되게. 결국 main 콤포넌트의 랜더링이 끝나고 실행될 수 있게
        setTimeout(function() {
            close(keyString);
        }, 5);
    };

    function close(keyString) {
        console.log("close,keyString:::", keyString);
        // close 로 삭제를 할 수 있어, unmount 가 있는지 확인한다.
        if (String.isNullOrWhitespace(root[keyString]) === false && typeof root[keyString].unmount === 'function') {
            root[keyString].unmount();
            // 미묘한 차이
            // 확실하게 알 수 없는 부분
            // main rendering에 영향을 주지 않고, 처리가 돼야 하는 부분인데. 맞추기가 쉽지 않다
            // 100 에서 부터 줄여나가다 1에서는 거의 에러가 없다.
            setTimeout(function() {
                delete root[keyString];
            }, 1);
        }
        if (String.isNullOrWhitespace(container[keyString]) === false && typeof container[keyString].remove === 'function') {
            container[keyString].remove();
            delete container[keyString];
        }
    }

    return {
        run: run,
        close: close
    };
};

export { CustomSelectBoxAsync };