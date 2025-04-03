// src/components/modules/login/login.js
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import $ from "cash-dom";
import { store } from "../../../redux/slice/store";
import { _setIsDone } from "../../../redux/slice/first-load";
import { useLogin } from "../../../hooks/utils/login";
import { formParser } from "../../../utils/form-parser";
import { formCheck } from "../../../utils/form-check";
import { isFormSubmit } from "../../../utils/form-submit-check";
import { stopBubbling } from "../../../utils/stop-bubbling";
import { LOGIN_FAIL as LOGIN_FAIL_MESSAGE } from "./constants/login-fail-message";
import { Notify } from '../../../utils/global-utils';
import { FIRST_LOAD_DATA } from "../../../init/first-load-data";

export const ModuleController = {
    index: function() {
        // 디자인 컴포넌트를 반환
        return ({ onLastLoad }) => {
            console.log(":::::module > login:::::", Date.getNow());
            const cookieId = store.getState().auth._cookieId;
            const { runLogin } = useLogin();
            const [Component, setComponent] = React.useState(null);
            const location = useLocation();
            const navigate = useNavigate();

            const setAddEvent = function() {
                if (cookieId !== null) {
                    $(`#login_userId`).prop(`checked`, true);
                    $(`#id_input`).val(cookieId);
                }

                // 이벤트 설정
                // 로그인 버튼
                $(`#login_btn`).off(`click`).on(`click`, async function(e) {
                    stopBubbling(e);
                    const form = formParser(`#dataForm`);
                    if (formCheck(`#dataForm`) === true) {
                        isFormSubmit(`#dataForm`);
                        const _r = await runLogin(form);
                        if (_r.result === false) {
                            if (String.isNullOrWhitespace(_r.code) === false) {
                                Notify(`top-center`, LOGIN_FAIL_MESSAGE.GET(_r.code), `error`);
                            }
                            isFormSubmit(`#dataForm`, `end`);
                        }
                        else {

                            // 기본 조회 코드 넣기
                            ///////////////////////////////////////////////////////////////////////////////////////
                            console.log("login - FIRST_LOAD_DATA");
                            const _d = await FIRST_LOAD_DATA();
                            store.dispatch(_setIsDone(_d));
                            ///////////////////////////////////////////////////////////////////////////////////////

                            navigate(`/${window.CONSTANTS.get(`APP.DEFAULT_URL`).CONTROLLER}`, { state: { back: location.pathname } });
                        }
                    }
                });
                // 입력항목에서 엔터 클릭
                $(`#id_input, #password_input`).off(`keypress`).on(`keypress`, function(e) {
                    let keycode = (e.keyCode ? e.keyCode : e.which);
                    if (keycode == '13') {
                        const form = formParser(`#dataForm`);
                        if (String.isNullOrWhitespace($(`#id_input`).val()) === false && String.isNullOrWhitespace($(`#password_input`).val()) === false) {
                            runLogin(form);
                        }
                        else {
                            if (formCheck(`#dataForm`) === true) {
                                runLogin(form);
                            }
                        }
                    }
                });
            };

            useEffect(function() {
                (async function() {
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

            // 로딩 중 표시
            if (Component === null) {
                return <>Design Loading...</>;
            }

            return <Component onLoad={setAddEvent} onLastLoad={onLastLoad}/>;
        };
    },
};
