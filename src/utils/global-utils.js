// src/utils/global-utils.js
import React from "react";
import ReactDOM from "react-dom/client";
import $ from "cash-dom";
// toast.success(), toast.error(), toast.warn(), toast.info()
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
