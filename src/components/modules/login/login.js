
/**
 * 로그인 데이타 처리 콤포넌트
 * @fileoverview
 * 1. 최초 빈 콤포넌트를 화면에 랜더링
 * 2. 랜더링 후 최초 useEffect에서 디자인 콤포넌트를 동적으로 로딩
 * 3. 디자인 콤포넌트를 화면에 랜더링
 * 4. 디자인 콤포넌트에서 랜더링 후 최초 useEffect에서 전달받은 이벤트등록(setAddEvent = onLoad) 함수 실행
 * 5. 해당 함수에서 로그인 페이지에서 필요한 action 관련 이벤트를 모두 등록
 */

import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import $ from "cash-dom";
import { LOGIN_FAIL as LOGIN_FAIL_MESSAGE } from "./constants/login-fail-message";

import { useFirstLoad } from "../../../hooks/first-load";
import { useAuth as useAuthNoRender } from "../../../hooks/utils-no-render/auth";
import { useLogin } from "../../../hooks/utils/login";

import { Notify } from '../../../utils/global-utils';
import { formParser } from "../../../utils/form-parser";
import { formCheck } from "../../../utils/form-check";
import { isFormSubmit } from "../../../utils/form-submit-check";
import { stopBubbling } from "../../../utils/stop-bubbling";
import { silentNavigate } from "../../../utils/silent-navigate";

import { FIRST_LOAD_DATA } from "../../../init/first-load-data";
import { RUN as LOGIN_API_RUN } from "../../../components/modules/login/constants/fake-api";
import { useVariable as useVariableNoRender } from "../../../hooks/utils-no-render/variable";

export const ModuleController = {
    index: function() {
        return ({ onLastLoad }) => {
            console.log(":::::module > login:::::", Date.getNow());
            // LOGIN_API_RUN();
            const { isDone, setIsDone } = useFirstLoad();
            const { cookieId } = useAuthNoRender();
            const { runLogin } = useLogin();
            const [ Component, setComponent ] = React.useState(null);
            const location = useLocation();
            const { get: getVariable } = useVariableNoRender();

            /**
             * 로그인 처리 과정 함수
             *
             * @description
             * - 로그인 페이지에서 로그인의 일련의 과정을 처리하는 함수
             *   1) id, pass 입력 여부 검사
             *   2) 실질적으로 로그인을 처리하는 훅으로 id/pass 정보 전달
             *   3) 결과에 따른 notify 처리
             *   4) 기본 페이지로 이동되게 처리
             *
             * @returns {void}
             */
            const _runLogin = async function() {
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
                        const _d = await FIRST_LOAD_DATA();
                        setIsDone(_d);
                        ///////////////////////////////////////////////////////////////////////////////////////
                        // // setIsDone 상태 변경으로 main이 재랜더링 되지만, login 주소는 무조건 실행 하게 처리를 해놔서
                        // // 강제로 주소를 바꿔주고, useLocation에서 변경됐다고 알려주는 처리를 한다.
                        // // 아래 함수에서 처리를 한다.
                        silentNavigate(`/${getVariable(`APP.DEFAULT_URL`).CONTROLLER}`, { state: { back: location.pathname } });
                    }
                }
            };

            /**
             * 디자인 콤포넌트 로딩 완료 후 이벤트 등록 처리 함수
             *
             * @description
             * - 디자인 콤포넌트로 전달한 setAddEvent 를 디자인 콤포넌트가 로딩이 완료되면, useEffect 함수가 실행되고 그 함수 안에서 전달 받은 setAddEvent 를 실행한다.
             *
             * @returns {void}
             */
            const setAddEvent = function() {
                if (cookieId !== null) {
                    $(`#login_userId`).prop(`checked`, true);
                    $(`#id_input`).val(cookieId);
                }

                // 이벤트 설정
                // 로그인 버튼
                $(`#login_btn`).off(`click`).on(`click`, async function(e) {
                    stopBubbling(e);
                    await _runLogin();
                });
                // 입력항목에서 엔터 클릭
                $(`#id_input, #password_input`).off(`keypress`).on(`keypress`, async function(e) {
                    let keycode = (e.keyCode ? e.keyCode : e.which);
                    if (keycode == '13') {
                        await _runLogin();
                    }
                });
            };

            // 디자인 콤포넌트 동적 로딩
            // 디자인 관련 스타일도 동적 로딩
            useEffect(function() {
                (async function() {
                    try {
                        // 스타일 추가
                        ////////////////////////////////////////////////////////////////////
                        await import (`./assets/css/${getVariable(`APP.THEME`)}/style.css`);
                        ////////////////////////////////////////////////////////////////////

                        const { Design } = await import(`./template/${getVariable(`APP.THEME`)}/login`);
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
