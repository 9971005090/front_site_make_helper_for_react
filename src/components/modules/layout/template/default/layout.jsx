// src/layout/designs/default/layout.jsx
import React from "react";
import { Controller } from '../../../../controllers';
import { Header } from "../../header";
import { Left } from "../../left";
import { Footer } from "../../footer";

const Design = {
    index: function() {
        return ({ url, onLastLoad }) => {
            return (

                String.isLayoutNeeded(url.controller) === true ? (

                    <div id="wrap">

                        <Header url={url} />

                        <main id="wrap-cont">

                            <Left url={url} />

                            <section className="cm-main-content" id="main-contents">
                                <div className="page-top">
                                    <h3 className="page-title">게이트웨이</h3>
                                    <div className="page-nav">
                                        <a className="page-nav-link go-main-link" style={{cursor: "pointer"}}>
                                            <span className="fa fa-home"></span>
                                        </a>
                                        <span className="icon fa fa-angle-right"></span>
                                        <a className="page-nav-link controller" style={{cursor: "pointer"}}>게이트웨이</a>
                                        <span className="icon fa fa-angle-right"></span>
                                        <a className="page-nav-link action">게이트웨이</a>
                                    </div>
                                </div>
                                <article id="main-cont"><Controller url={url} onLastLoad={onLastLoad} /></article>
                            </section>
                        </main>

                        <Footer url={url} />

                    </div>

                )
                : (

                    <Controller url={url} onLastLoad={onLastLoad}/>

                )
            );
        };
    }
};

export { Design };