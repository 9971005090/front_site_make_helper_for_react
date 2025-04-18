// src/designs/content/organ.js
import React from "react";
import moment from "moment";
import { CustomDatetime } from "../../../../components/modules/custom-datetime";

export const Design = {
    index: function() {
        return function({ onLoad, onLastLoad, THEME, etc }) {
            console.log(":::::Template statistics start:::::", Date.getNow(), etc);
            const [value, onChange] = React.useState(new Date());
            React.useEffect(function() {
                if (String.isNullOrWhitespace(onLoad) === false) {
                    onLoad();
                }
                if (String.isNullOrWhitespace(onLastLoad) === false) {
                    onLastLoad();
                }
            }, []);

            const defaultDate = {
                start: moment().subtract(7, 'days').format(`YYYY-MM-DD`),
                end: moment().format(`YYYY-MM-DD`),
            };

            return (
                <div className="common-cont">
                    <div className="sub-cont-top">
                        <h4 className="sub-cont-title">Search</h4>
                    </div>
                    <form className="form-common-search">
                        <div className="search-form">
                            <div className="tit">기관</div>
                            <div className="cont">
                                <div className="select-box-parent-for-organ"></div>
                            </div>
                            <div className="tit">검색기간</div>
                            <div className="cont">
                                <CustomDatetime info={{id: `start-date-time`, name: 'startDateTime', class: {parent: `search-date-for-start-parent`, child: `search-date-for-start`}, default: moment().subtract(7, 'days').format(`YYYY-MM-DD`), useOption: true}} />
                                ~
                                <CustomDatetime info={{id: `end-date-time`, name: 'endDateTime', class: {parent: `search-date-for-end-parent`, child: `search-date-for-end`}, default: moment().format(`YYYY-MM-DD`), useOption: true}} />
                                <div className="cm-device-search">
                                    <button type="button" className="device-search-btn form-common-search-button">
                                        <span className="img"></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="cm-table-wrap board-view">
                        <div className="cm-table-cont">
                            <div className="cm-colgroup">
                                <div style={{width: "28%"}}></div>
                                <div style={{width: "18%"}}></div>
                                <div style={{width: "18%"}}></div>
                                <div style={{width: "18%"}}></div>
                                <div style={{width: "18%"}}></div>
                            </div>
                            <div className="cm-thead">
                                <div className="cm-tr">
                                    <div className="cm-th">기관</div>
                                    <div className="cm-th">총개수</div>
                                    <div className="cm-th">검색기간 이전수</div>
                                    <div className="cm-th">검색기간수</div>
                                    <div className="cm-th">검색기간 다음수</div>
                                </div>
                            </div>
                            <div className="cm-tbody" id="contents-by-data-table"></div>
                        </div>
                    </div>
                    <div className="pagination" id="pagination"></div>
                </div>
            );
        };
    },

    day: function() {
        return function({onLoad, onLastLoad }) {
            React.useEffect(function() {
                if (String.isNullOrWhitespace(onLoad) === false) {
                    onLoad();
                }
                if (String.isNullOrWhitespace(onLastLoad) === false) {
                    onLastLoad();
                }
            }, []);

            const defaultDate = {
                start: moment().subtract(7, 'days').format(`YYYY-MM-DD`),
                end: moment().format(`YYYY-MM-DD`),
            };

            return (
                <div className="common-cont">
                    <div className="sub-cont-top">
                        <h4 className="sub-cont-title">Search</h4>
                    </div>
                    <form className="form-common-search">
                        <div className="search-form">
                            <div className="tit">기관</div>
                            <div className="cont">
                                <div className="select-box-parent-for-organ"></div>
                            </div>
                            <div className="tit">검색기간</div>
                            <div className="cont">
                                <CustomDatetime info={{id: `start-date`, name: 'startDate', class: {parent: `search-date-for-start-parent`, child: `search-date-for-start`}, default: moment().subtract(7, 'days').format(`YYYY-MM-DD`), useOption: true}} />
                                ~
                                <CustomDatetime info={{id: `end-date`, name: 'endDate', class: {parent: `search-date-for-end-parent`, child: `search-date-for-end`}, default: moment().format(`YYYY-MM-DD`), useOption: true}} />
                                <div className="cm-device-search">
                                    <button type="button" className="device-search-btn form-common-search-button">
                                        <span className="img"></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>

                    <div className="cm-table-wrap chart-view" id="chart-view"
                         style={{
                             width: "100%",
                             height: "234px",
                             minHeight: "234px",
                             border: "1px solid var(--light-gray-100)",
                             marginBottom: "16px",
                             display: "flex",
                             justifyContent: "center",
                             alignItems: "center"
                         }}>
                        챠트 생성중..
                    </div>

                    <div className="cm-table-wrap board-view">
                        <div className="cm-table-cont">
                            <div className="cm-colgroup">
                                <div style={{width: "60%"}}></div>
                                <div style={{width: "40%"}}></div>
                            </div>
                            <div className="cm-thead">
                                <div className="cm-tr">
                                    <div className="cm-th">날짜</div>
                                    <div className="cm-th">개수</div>
                                </div>
                            </div>
                            <div className="cm-tbody" id="contents-by-data-table"></div>
                        </div>
                    </div>
                    <div className="pagination" id="pagination"></div>
                </div>
            );
        };
    }
};