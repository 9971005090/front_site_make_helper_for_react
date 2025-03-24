// src/components/modules/custom-alert/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import _ from "lodash";

import $ from "cash-dom";

const customMerge = (objValue, srcValue) => {
    if (Array.isArray(objValue) && Array.isArray(srcValue)) {
        return [...objValue, ...srcValue]; // 배열 병합 (기존 값 + 새로운 값)
    }
};
const CustomAlertAsync = (function() {
    const container = document.createElement("div");
    const root = ReactDOM.createRoot(container);
    let parsingValue = {
        isBackgroundClickForClose: false,
        eventCallback: null,
        title: null,
        msg: null,
        button: {
            cancel: {
                isUse: true,
                callback: [
                    {
                        name: close,
                        params: []
                    }
                ]
            },
            ok: {
                isUse: true,
                callback: [
                    {
                        name: close,
                        params: []
                    }
                ]
            },
            del: {
                isUse: true,
                callback: [
                    {
                        name: close,
                        params: []
                    }
                ]
            }
        }
    };

    const Modal = function({ parsingValue }) {
        const [Component, setComponent] = React.useState(null);
        const [isLoaded, setIsLoaded] = React.useState(false);
        const onLoad = function() {
            setIsLoaded(function(state) {
                return !state;
            });
        };

        React.useEffect(function() {
            // console.log(`useEffect 최상단 - ${format(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS')}`);
            (async function() {
                try {
                    // 스타일 추가
                    ////////////////////////////////////////////////////////////////////
                    await import(`./assets/css/${window.CONSTANTS.get(`APP.THEME`)}/index.css`);
                    ////////////////////////////////////////////////////////////////////

                    const { Design } = await import(`./templates/${window.CONSTANTS.get(`APP.THEME`)}/index`);
                    setComponent( Design );
                } catch (error) {
                    console.error("Failed to load design component:", error);
                }
            })();
        }, []);

        // 컴포넌트가 렌더링된 후에 버튼 이벤트 설정
        React.useEffect(function() {
            if (Component !== null && isLoaded === true) {

                ////////////////////////////////////////////////////////////////////
                (async function() {
                    try {
                        ////////////////////////////////////////////////////////////////////
                        (await import(`./events/${window.CONSTANTS.get(`APP.THEME`)}/index`)).event(parsingValue);
                        ////////////////////////////////////////////////////////////////////

                    } catch (error) {
                        console.error("Failed to load design component:", error);
                    }
                })();

                // 콤포넌트가 언마운트 되거나, 재실행시 return 부분이 실행된다.
                // 예외처리를 하더라도, 최초 등록이 됐다면 이후 조건에 상관없이 위 상황에서는 계속 실행된다.
                return function() {

                };
                ////////////////////////////////////////////////////////////////////

            }
        }, [isLoaded, parsingValue]);

        if (Component === null) {
            return null;
        }

        return <Component parsingValue={parsingValue} onLoad={onLoad} />;
    };

    const open = function(initParameter = null) {
        if (initParameter === null) {
            return;
        }
        if (Object.prototype.hasOwnProperty.call(initParameter, `msg`) === false) {
            return;
        }
        parsingValue = _.mergeWith({}, parsingValue, initParameter, customMerge);

        document.body.appendChild(container);
        root.render(
            <Modal parsingValue={parsingValue}/>
        );
    };

    function close() {
        console.log("close");
        // root.unmount();
        container.remove();
    }

    return {
        open: open,
        close: close
    };
})();

export { CustomAlertAsync };