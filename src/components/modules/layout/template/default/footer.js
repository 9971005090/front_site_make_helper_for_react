// src/layout/designs/default/Footer.js
import React from "react";
export const Design = {
    index: () => {
        // 디자인 컴포넌트를 반환
        return () => {
            return (
                <footer id="footer" className="cm-footer">
                    <div className="cm-footer-section">
                        <article className="cm-footer-top d-none"></article>
                        <article className="cm-footer-btm">
                            <p className="copyright">COPYRIGHT 2024 © Seers Technology.ALL RIGHTS RESERVED.</p>
                        </article>
                    </div>
                    <button type="button" className="cm-btn-top" style={{ opacity: 0 }}>
                        <span className="icon fa fa-arrow-up"></span>
                    </button>
                    <div className="cookie-popup on d-none">
                        이 웹사이트는 원활한 서비스 제공을 위하여 당사 개인정보 처리방침에 명시된 쿠키를 사용합니다. 만일 당사의 쿠키 사용 정책에 대해 더 알고 싶으신 경우에는 개인정보 처리방침을
                        참고하여 주시기 바랍니다.<br/>
                        <button type="button" className="cm-btn cm-btn-full-default btn-cookie-agree">동의하기</button>
                    </div>
                </footer>
            );
        };
    }
};
