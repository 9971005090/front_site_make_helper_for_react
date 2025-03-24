// src/components/modules/custom-alert/template/default/index.js
import React from "react";

const Design = function() {
    const Component = function({ parsingValue, onLoad }) {
        React.useEffect(function() {
            if (onLoad) {
                onLoad();
            }
        }, []);
        return (
            <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 100000 }}>
                <div className="layer_popup_container" id="customAlertPushDelete" style={{width: "480px", height: "auto", zIndex: 100001, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                    <div className="layer_popup_body" style={{ textAlign: "center" }}>
                        <p className="customAlertText">{ parsingValue.msg }</p>
                    </div>
                    <div className="layer_popup_footer">
                        { parsingValue.button.cancel.isUse === true && (
                        <button type="button" className="custom-button custom-button-secondary customAlertButtonForCancel">
                            취소
                        </button>
                        )}
                        { parsingValue.button.ok.isUse === true && (
                        <button type="button" className="custom-button custom-button-info customAlertButtonForOk" style={{marginLeft: "5px"}}>
                            확인
                        </button>
                        )}
                        { parsingValue.button.del.isUse === true && (
                        <button type="button" className="custom-button custom-button-danger customAlertButtonForDelete" style={{marginLeft: "5px"}}>
                            삭제
                        </button>
                        )}
                    </div>
                </div>
            </div>
        );
    };
    return Component;
};

export { Design };