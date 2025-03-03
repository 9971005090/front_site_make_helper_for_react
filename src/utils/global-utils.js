import React from "react";
import ReactDOM from "react-dom/client";
export const notify = async () => {
    const { toast, ToastContainer, Slide } = await import("react-toastify");
    await import("react-toastify/dist/ReactToastify.css");

    const containerId = "toast-container";

    // ToastContainer가 없으면 DOM에 추가
    if (!document.getElementById(containerId)) {
        const container = document.createElement("div");
        container.id = containerId;
        document.body.appendChild(container);

        // React 19 방식으로 렌더링 (hydrateRoot 또는 직접 DOM 삽입)
        document.body.appendChild(container);
        container.innerHTML = `<div id="toast-root"></div>`;

        import("react-dom").then(() => {
            ReactDOM.createRoot(document.getElementById("toast-root")).render(
                <ToastContainer
                    position="top-right"
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
                            container.remove();
                        }
                    }}
                />
            );
        });
    }

    // 토스트 메시지 출력
    toast.success("성공 메시지!", { position: "top-right" });
};



export const CustomModal = (() => {
    const container = document.createElement("div");
    const root = ReactDOM.createRoot(container);

    const open = () => {
        document.body.appendChild(container);

        root.render(
            <div style={{
                position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 9999
            }}>
                <div style={{
                    position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                    backgroundColor: "white", padding: "20px", borderRadius: "5px"
                }}>
                    <h2>모달 콘텐츠</h2>
                    <p>여기에 동적으로 추가된 모달 내용</p>
                    <button onClick={close}>닫기</button>
                </div>
            </div>
        );
    };

    const close = () => {
        container.remove();
    };

    return {
        open: open
    };
})();