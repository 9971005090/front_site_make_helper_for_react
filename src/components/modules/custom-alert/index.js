// src/components/modules/custom-alert/index.js
import React from "react";
import ReactDOM from "react-dom/client";

import $ from "cash-dom";
// import {event as eventOrganAdd} from "../../../events/controllers/organ/add";
// import {event as eventOrgan} from "../../../events/controllers/organ";


const CustomAlert = (() => {
    const container = document.createElement("div");
    const root = ReactDOM.createRoot(container);

    const Modal = function ({ passParams }) {
        const [Component, setComponent] = React.useState(null);
        const [isLoaded, setIsLoaded] = React.useState(false);
        const onLoad = () => {
            setIsLoaded(function (state) {
                return !state;
            });
        };

        React.useEffect(() => {
            // console.log(`useEffect 최상단 - ${format(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS')}`);
            (async () => {
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
        React.useEffect(() => {
            if (Component !== null && isLoaded === true) {

                ////////////////////////////////////////////////////////////////////

                (async function() {
                    try {
                        ////////////////////////////////////////////////////////////////////
                        passParams['close'] = close;
                        (await import(`./events/${window.CONSTANTS.get(`APP.THEME`)}/index`)).event(passParams);
                        ////////////////////////////////////////////////////////////////////

                    } catch (error) {
                        console.error("Failed to load design component:", error);
                    }
                })();

                // 콤포넌트가 언마운트 되거나, 재실행시 return 부분이 실행된다.
                // 예외처리를 하더라도, 최초 등록이 됐다면 이후 조건에 상관없이 위 상황에서는 계속 실행된다.
                return () => {

                };
                ////////////////////////////////////////////////////////////////////

            }
        }, [isLoaded, passParams]);

        if (Component === null) {
            return null;
        }

        return <Component passParams={passParams} onLoad={onLoad} />;
    };

    const open = (passParams) => {
        document.body.appendChild(container);

        root.render(
            <Modal passParams={passParams}/>
        );
    };

    const close = () => {
        // root.unmount();
        container.remove();
    };

    return {
        open: open,
        close: close
    };
})();

export { CustomAlert };