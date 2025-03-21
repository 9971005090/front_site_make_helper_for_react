// src/layout/designs/default/Layout.js
import React from "react";
import { Controller } from '../../../../controllers';
import { Header } from "../../header";
import { Left } from "../../left";
import { Footer } from "../../footer";
import { format } from 'date-fns';

export const Design = {
    index: () => {
        // 디자인 컴포넌트를 반환
        return ({ uriParams, onLastLoad }) => {
            return (

                String.isLayoutNeeded(uriParams.controller) === true ? (

                    <div id="wrap">

                        <Header uriParams={uriParams} />

                        <main id="wrap-cont">

                            <Left uriParams={uriParams} />

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
                                <article id="main-cont"><Controller uriParams={uriParams} onLastLoad={onLastLoad} /></article>
                            </section>
                        </main>

                        <footer />

                    </div>

                )
                : (

                    <Controller uriParams={uriParams} onLastLoad={onLastLoad}/>

                )
            );
        };
    }
};