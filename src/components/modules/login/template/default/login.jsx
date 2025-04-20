
/**
 * 로그인 디자인 처리 콤포넌트
 * @fileoverview
 * 1. 디자인을 화면에 랜더링
 * 2. 랜더링 후 최초 useEffect에서 부모(데이터 처리 콤포넌트)에서 받은 callback 함수를 실행
 *    - onLoad(부모 콜백)
 *    - onLastLoad(main 콤포넌트 콜백)
 */

import React from "react";

export const Design = {
    index: function() {
        return ({ onLastLoad, onLoad }) => {
            React.useEffect(function() {
                if (onLastLoad) {
                    onLastLoad();
                }
                if (onLoad) {
                    onLoad();
                }
            }, []);
            return (
                <div id="login_module_wrap">
                    <div id="login_module_wrap_content" className="login_module_main">
                        <div className="login_module_wrap_inner">

                            <div className="login_module_logo">
                                <a className="login_module_link">
                                    <span>LOGIN</span>
                                </a>
                            </div>

                            <div className="text-cont">
                                <h4>반갑습니다.</h4>
                                <p className="gray-text mt-4">
                                    * 이 페이지는 접근과 동시에 IP주소가 자동저장됩니다.<br/>
                                    관계자 이외에 접근시도는 해킹 시도로 의심, 추적되어 불이익을 당할 수도 있습니다.
                                </p>
                            </div>

                            <form id="dataForm" autoComplete="off" className="login_module_login mt-20">
                                <div className="cm-input-cont">
                                    <input type="text" id="id_input" name="id_input" className="check cm-input-text" placeholder="아이디를 입력해 주세요." autoComplete="off"/>
                                    <p className="error-text">아이디를 입력해 주세요.</p>
                                </div>
                                <div className="cm-input-cont mt-12">
                                    <input type="password" id="password_input" name="password_input" className="cm-input-text check" placeholder="비밀번호를 입력해 주세요." autoComplete="off"/>
                                    <p className="error-text">비밀번호를 입력해 주세요.</p>
                                </div>
                                <div className="login_module_check2">
                                    <div className="cm-checkbox-box type02 mt-12">
                                        <input className="input login_module_green_custom" type="checkbox" name="login_userId" id="login_userId"/>
                                        <label className="span" htmlFor="login_userId">아이디 기억</label>
                                    </div>
                                    <div className="login_module_input_wrap"></div>
                                </div>
                                <button type="button" id="login_btn" className="cm-btn cm-btn-full-default cm-btn-auto-large mt-24">로그인
                                </button>
                            </form>
                        </div>
                    </div>

                    <footer id="login_module_footer">
                        <div className="login_module_company_info">
                            <p className="login_module_copyright">COPYRIGHT 2018 © Seers Technology. ALL RIGHTS RESERVED.</p>
                        </div>
                    </footer>

                </div>
            );
        };
    }
};