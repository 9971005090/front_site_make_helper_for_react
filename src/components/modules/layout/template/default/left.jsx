// src/layout/designs/default/Left.js
import React from "react";
export const Design = {
    index: () => {
        // 디자인 컴포넌트를 반환
        return ({onLoad, leftMenu}) => {
            React.useEffect(() => {
                if (onLoad) {
                    onLoad();
                }
            }, [leftMenu]);
            return (
                <nav className="cm-left-nav">
                    <section className="cm-left-nav-section nav-type-long">
                        <ul id="side-menu" className="gnb scroll-bar">

                            {leftMenu && leftMenu.length > 0 && (
                                leftMenu.map((menu, index) => (
                                    <li key={index} className={`gnb-list ${menu.selected}`} data-info={menu.data.info} data-location={menu.data.location}>
                                        <a className="link" style={{ cursor: "pointer" }}>
                                            <span className="txt">{menu.name}</span>
                                        </a>
                                    </li>
                                ))
                            )}

                        </ul>
                    </section>
                </nav>
            );
        };
    }
};