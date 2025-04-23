
/**
 * 사이트에서 자주 사용하는 유틸리티 모음 파일
 * @fileoverview
 * - 현재는 notify 만 있음
 * - `react-toastify`를 사용하여 알림 메시지를 표시함.
 * - 알림 컨테이너가 없으면 동적으로 추가하여 유지.
 * - 동일한 메시지를 여러 번 보낼 때 일부가 표시되지 않는 문제 해결을 위해 재시도 로직 포함.
 * - 알림이 모두 닫히면 `DOM`에서 제거하여 리소스를 절약함.
 */

import React from "react";
import ReactDOM from "react-dom/client";
import $ from "cash-dom";
// toast.success(), toast.error(), toast.warn(), toast.info()

/**
 * 알림(Notification) 메시지를 표시하는 콤포넌트를 동적으로 생성하는 함수
 * @description
 * - fileoverview 참조
 *
 * @async
 * @param {string} [position="top-center"] - 알림 위치 ("top-left", "top-right", "top-center", "bottom-left", "bottom-right", "bottom-center")
 * @param {string} [message="성공 메시지!"] - 표시할 메시지
 * @param {string} [type="success"] - 알림 타입 ("success", "error", "warn", "info")
 * @param {Object} [callback=null] - 알림이 닫힌 후 실행할 콜백 함수 (선택 사항)
 * @param {Function} callback.func - callback 함수
 * @param {Array} callback.params - callback 함수에 사용할 파라미터(구조분해하여 개별 파라미터로 사용한다)
 */
const Notify = async function(position = `top-center`, message = `성공 메시지!`, type = `success`, callback = null) {
    const { toast, ToastContainer, Slide } = await import("react-toastify");
    await import("react-toastify/dist/ReactToastify.css");

    const containerId = `toast-container`;

    // ToastContainer가 없으면 DOM에 추가
    // const container = $(`<div>`).attr(`id`, `site-rendering`);
    // const root = ReactDOM.createRoot(container[0]);

    if ($(`#${containerId}`).length <= 0) {
        const container = $(`<div>`).attr(`id`, containerId);
        // container.id = containerId;
        $(`body`).append(container[0]);
        container.html(`<div id="toast-root"></div>`);

        import("react-dom").then(function() {
            const ReactRoot = ReactDOM.createRoot($(`#toast-root`)[0]);
            ReactRoot.render(
                <ToastContainer
                    position={position} //"top-left", "top-right", "top-center", "bottom-left", "bottom-right", "bottom-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    transition={Slide}
                    onClose={() => {
                        // 토스트가 모두 사라지면 DOM 제거
                        if (document.getElementsByClassName("Toastify__toast").length === 1) {
                            document.getElementById("toast-root")?.remove();
                            ReactRoot.unmount();
                            container.remove();
                        }
                        if (callback !== null) {
                            callback.func(...callback.params);
                        }
                    }}
                    style={{zIndex: 1000000}}
                />
            );
        });
    }


    // 같은 메세지를 보낼때 2,4,6번째 부터는 나오지 않는 문제가 있음
    // 그래서 콤포넌트가 랜더링이 됐는지 확인 후 처리되게 수
    let timeoutId = null;
    const existContainer = function() {
        if ($(`#toast-container #toast-root .Toastify`).length > 0) {
            toast(message, { type: type, position: position, toastId: `unique-toast` });
            return;
        }
        timeoutId = setTimeout(function() {
            existContainer();
        }, 10);
    };

    // 일정 시간이 지나면 자동으로 멈추도록 추가
    setTimeout(function() {
        clearTimeout(timeoutId);
    }, 1000); // 5초 후에 강제 종료

    existContainer();
};

export { Notify };
