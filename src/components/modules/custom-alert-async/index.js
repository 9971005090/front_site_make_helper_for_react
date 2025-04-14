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
    let container = null;
    let root = null;
    let parsingValue = null;

    const Modal = function({ parsingValue }) {
        const [Component, setComponent] = React.useState(null);
        // const [isLoaded, setIsLoaded] = React.useState(false);
        const onLoad = async function() {
            ////////////////////////////////////////////////////////////////////
            // 모달 공통 event
            setTimeout(function() {
                if (parsingValue.eventCallback !== null) {
                    if (Array.isArray(parsingValue.eventCallback) === true) {
                        for(let i = 0; i < parsingValue.eventCallback.length; i++) {
                            parsingValue.eventCallback[i].name(...parsingValue.eventCallback[i].params);
                        }
                    }
                }

                if (parsingValue.isBackgroundClickForClose === true) {
                    $(`.layer_popup`).off(`click`).on(`click`, function(e) {
                        if (parsingValue.closeCallBack !== null) {
                            if (Array.isArray(parsingValue.closeCallBack) === true) {
                                for(let i = 0; i < parsingValue.closeCallBack.length; i++) {
                                    parsingValue.closeCallBack[i].name(...parsingValue.closeCallBack[i].params);
                                }
                            }
                        }
                        close();
                    });
                }
            }, 100);


            (await import(`./events/${window.CONSTANTS.get(`APP.THEME`)}/index`)).event(parsingValue);
            ////////////////////////////////////////////////////////////////////
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

        // // 컴포넌트가 렌더링된 후에 버튼 이벤트 설정
        // React.useEffect(function() {
        //     if (Component !== null && isLoaded === true) {
        //
        //         ////////////////////////////////////////////////////////////////////
        //         (async function() {
        //             try {
        //                 ////////////////////////////////////////////////////////////////////
        //                 (await import(`./events/${window.CONSTANTS.get(`APP.THEME`)}/index`)).event(parsingValue);
        //                 ////////////////////////////////////////////////////////////////////
        //
        //             } catch (error) {
        //                 console.error("Failed to load design component:", error);
        //             }
        //         })();
        //
        //         // 콤포넌트가 언마운트 되거나, 재실행시 return 부분이 실행된다.
        //         // 예외처리를 하더라도, 최초 등록이 됐다면 이후 조건에 상관없이 위 상황에서는 계속 실행된다.
        //         return function() {
        //
        //         };
        //         ////////////////////////////////////////////////////////////////////
        //
        //     }
        // }, [isLoaded, parsingValue]);

        if (Component === null) {
            return null;
        }

        return <Component parsingValue={parsingValue} onLoad={onLoad} />;
    };

    const createRoot = function() {
        container = document.createElement("div");
        root = ReactDOM.createRoot(container);
    };
    const paramsInit = function() {
        parsingValue = {
            isBackgroundClickForClose: false,
            eventCallback: null,
            closeCallBack: null,
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
                    // callback: [
                    //     {
                    //         name: close,
                    //         params: []
                    //     }
                    // ]
                    callback: []
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
    };
    const open = function(initParameter = null) {
        if (initParameter === null) {
            return;
        }
        paramsInit();
        if (Object.prototype.hasOwnProperty.call(initParameter, `msg`) === false) {
            return;
        }
        parsingValue = _.mergeWith({}, parsingValue, initParameter, customMerge);
        createRoot();
        document.body.appendChild(container);
        root.render(
            <Modal parsingValue={parsingValue}/>
        );
    };

    function close() {
        if (root !== null) {
            console.log("close-unmount");
            root.unmount();
            root = null;
        }
        if (container !== null) {
            console.log("close-remove");
            container.remove();
            container = null;
        }
    }

    return {
        open: open,
        close: close
    };
})();

export { CustomAlertAsync };