// src/components/utils/loading-process.js
import React from "react";
import { useFirstLoad } from "../../hooks/first-load";
import { FIRST_LOAD_DATA } from "../../init/first-load-data";
import { useAuth as useAuthNoRender } from "../../hooks/utils-no-render/auth";
import { base64SVG as base64SVGForLoadingProcess } from "../../components/utils/files/loading-process-image";

const LoadingProcess = function() {
    console.log(":::::LoadingProcess:::::", Date.getNow());
    const { isAuthenticated } = useAuthNoRender();
    const { isDone, setIsDone } = useFirstLoad();
    // const { isDone: isDoneForLoading, setIsDone: setIsDoneForLoading } = useLoadingProcess();

    React.useEffect(function() {
        (async function() {
            if (isDone === false && isAuthenticated === true) {
                const _d = await FIRST_LOAD_DATA();
                setIsDone(_d);
            }
        })();
    }, [isDone]);

    // 스타일 정의
    const loadingStyles = `
        .rotate-img {
            animation: rotate_image 2s linear infinite;
            transform-origin: 50% 50%;
        }
        @media screen and (min-width:1200px), screen and (max-width:1199px), screen and (max-width:1023px) {
            #contents-loading-child {
                width: 500px; height: 500px;
            }
            #contents-loading-child img {
                width: 500px;
            }
        }
        @media screen and (max-width:767px) {
            #contents-loading-child {
                width: 300px; height: 300px;
            }
            #contents-loading-child img {
                width: 300px;
            }
        }
        @media screen and (max-width:487px) {
            #contents-loading-child {
                width: 200px; height: 200px;
            }
            #contents-loading-child img {
                width: 200px;
            }
        }
        @keyframes rotate_image {
            100% {
                transform: rotate(360deg);
            }
        }
    `;

    return (
        <>
            <div id='loading-process-parent' style={{zIndex: 9999, position: "fixed", top: 150, left: 0, width: "100%", height: "100vh", display: "block" }}>
                <style>{loadingStyles}</style>
                <div id='loading-process-child' style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", boxSizing: "border-box", padding: 0, margin: 0}}>
                    <img src={base64SVGForLoadingProcess} className="rotate-img" />
                </div>
            </div>
        </>
    );
};

export { LoadingProcess };