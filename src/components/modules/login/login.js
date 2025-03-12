// src/controllers/login.js
import React, { useEffect } from "react";
import { useLogin } from "../../../hooks/utils/login";
import { useAuth } from "../../../hooks/auth";
import { format } from 'date-fns';

// import $ from "../utils/domHelper";
import $ from "cash-dom";
import { formParser } from "../../../utils/form-parser";
import { formCheck } from "../../../utils/form-check";
import { stopBubbling } from "../../../utils/stop-bubbling";


export const ModuleController = {
    index: () => {
        // 디자인 컴포넌트를 반환
        return () => {
            const { isAuthenticated, cookieId } = useAuth();
            const theme = `default`;
            const { loading, runLogin } = useLogin();
            const [Component, setComponent] = React.useState(null);
            useEffect(() => {
                // console.log(`useEffect 최상단 - ${format(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS')}`);
                (async () => {
                    try {
                        // 스타일 추가
                        ////////////////////////////////////////////////////////////////////
                        await import (`./assets/css/${window.CONSTANTS.get(`APP.THEME`)}/style.css`);
                        ////////////////////////////////////////////////////////////////////

                        const { Design } = await import(`./template/${window.CONSTANTS.get(`APP.THEME`)}/login`);
                        setComponent( Design.index );
                    } catch (error) {
                        console.error("Failed to load design component:", error);
                    }
                })();
            }, []);

            // 컴포넌트가 렌더링된 후에 버튼 이벤트 설정
            useEffect(() => {
                if (Component !== null) {
                    // 콤포넌트 최초 로딩 후
                    ////////////////////////////////////////////////////////////////////
                    if (cookieId !== null) {
                        $(`#login_userId`).prop(`checked`, true);
                        $(`#id_input`).val(cookieId);
                    }

                    // 이벤트 설정
                    // 로그아웃 버튼
                    $(`#login_btn`).off(`click`).on(`click`, function(e) {
                        stopBubbling(e);
                        const form = formParser(`#dataForm`);
                        if(formCheck(`#dataForm`) === true) {
                            runLogin(form);
                        }
                    });
                    // 입력항목에서 엔터 클릭
                    $(`#id_input, #password_input`).off(`keypress`).on(`keypress`, function(e) {
                        let keycode = (e.keyCode ? e.keyCode : e.which);
                        if(keycode == '13') {
                            const form = formParser(`#dataForm`);
                            if(String.isNullOrWhitespace($(`#id_input`).val()) === false && String.isNullOrWhitespace($(`#password_input`).val()) === false) {
                                runLogin(form);
                            }
                            else {
                                console.log("form:::", form);
                                if(formCheck(`#dataForm`) === true) {
                                    runLogin(form);
                                }
                            }
                        }
                    });
                    ////////////////////////////////////////////////////////////////////
                }
            }, [Component]); // DesignComponent가 로딩되면 이벤트 설정



            // 로딩 중 표시
            if (Component === null) {
                return <>Design Loading...</>;
            }

            return <Component />;
        };
    },
};
