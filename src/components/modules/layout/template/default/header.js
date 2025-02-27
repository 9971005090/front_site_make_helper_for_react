// src/layout/designs/default/Header.js
import React from "react";
import { parsingShowNowTime, parsingShowRandomString } from "../../../../../helpers/parsingUtil";

export const Design = {
    index: () => {
        // 디자인 컴포넌트를 반환
        return ({ getParams }) => {
            const { isAuthenticated, user } = getParams;
            return (
                <header id="header" className="cm-header">
                    <section className="cm-header-section type02">
                        <div className="cm-header-name">
                            <button className="burger-btn" id="burger-btn">
                                <span className="burger-line top-line"></span>
                                <span className="burger-line mid-line"></span>
                                <span className="burger-line btm-line"></span>
                            </button>
                            <h1 className="cm-header-logo">
                                <a className="cm-header-logo-link" style={{ cursor: "pointer" }}>
                                    <span className="logo-txt">thynC manager</span>
                                </a>
                            </h1>
                        </div>
                        <nav className="cm-top-menu">
                            <ul className="cm-top-menu-ul">
                                <li className="menu-list" data-info='{"datas": ["gateway", "gateway-fw"]}' data-location="/gateway/index">게이트웨이</li>
                                <li className="menu-list" data-info='{"datas": ["account"]}' data-location="/account/index">계정</li>
                                <li className="menu-list" data-info='{"datas": ["organ"]}' data-location="/organ/index">기관 </li>
                                <li className="menu-list" data-info='{"datas": ["device"]}' data-location="/device/index">의료기기</li>
                                <li className="menu-list" data-info='{"datas": ["log"]}' data-location="/log/index">로그</li>
                                <li className="menu-list" data-info='{"datas": ["notice"]}' data-location="/notice/index">공지사항</li>
                                <li className="menu-list" data-info='{"datas": ["statistics"]}' data-location="/statistics/index">통계</li>
                                <li className="menu-list" data-info='{"datas": ["sw-version"]}' data-location="/sw-version/index">SW 버전</li>
                            </ul>
                        </nav>
                        <article className="cm-header-left-cont d-none">
                        </article>
                        {isAuthenticated && (
                        <article className="cm-header-right-cont">
                            <p>
                                <span className="member-name">{user.name}</span>
                                <span className="span txt d-none">님 로그인 하셨습니다.</span>
                            </p>
                            <button type="button" className="cm-btn cm-btn-middle logout_btn logout-button">로그아웃</button>
                            <div className="btn-wrap d-none">
                                <button type="button" className="cm-btn cm-btn-small">버튼</button>
                            </div>
                        </article>
                        )}
                    </section>
                </header>
            );
        };
    }
};
