// src/layout/designs/default/left.jsx
import React from "react";

const Design = {
    index: function() {
        return function( {onLoad, leftMenu} ) {
            React.useEffect(function() {
                if (String.isNullOrWhitespace(onLoad) === false) {
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

export { Design };