// src/layout/designs/default/Left.js
import React from "react";
export const Design = {
    index: () => {
        // 디자인 컴포넌트를 반환
        return () => {
            return (
                <nav className="cm-left-nav">
                    <section className="cm-left-nav-section nav-type-long">
                        <ul id="side-menu" className="gnb scroll-bar">
                            <li className="gnb-list selected" data-location="/gateway/index">
                                <a className="link" style={{ cursor: "pointer" }}>
                                    <span className="txt">게이트웨이</span>
                                </a>
                            </li>
                            <li className="gnb-list" data-location="/gateway-fw/index">
                                <a className="link" style={{ cursor: "pointer" }}>
                                    <span className="txt">게이트웨이 펌웨어</span>
                                </a>
                            </li>
                        </ul>
                    </section>
                </nav>
            );
        };
    }
};