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

    add: function() {
        return function({onLoad, onLastLoad }) {
            React.useEffect(function() {
                if (String.isNullOrWhitespace(onLoad) === false) {
                    onLoad();
                }
                if (String.isNullOrWhitespace(onLastLoad) === false) {
                    onLastLoad();
                }
            }, []);
            return (
                <div className="common-cont">
                    <div className="sub-cont-top">
                        <h4 className="sub-cont-title">등록</h4>
                    </div>
                    <form id="form-data" className="form-data-table">
                        <div className="search-form">
                            <div className="tit require-validation">기관</div>
                            <div className="cont">
                                <div className="select-box-parent-for-organ">처리중...</div>
                            </div>
                            <div className="tit require-validation">병동</div>
                            <div className="cont">
                                <div className="select-box-parent-for-ward">처리중...</div>
                            </div>
                            <div className="tit require-validation">시리얼번호</div>
                            <div className="cont">
                                <div className="cm-input-cont">
                                    <input type="text" className="cm-input-text check active-check" placeholder="의료기기 고유 시리얼번호" name="serialNumber" maxLength="7" />
                                </div>
                            </div>
                            <div className="tit">닉네임</div>
                            <div className="cont">
                                <div className="cm-input-cont">
                                    <input type="text" className="cm-input-text" placeholder="의료기기 고유 닉네임" name="deviceCode" maxLength="25" />
                                </div>
                            </div>
                            <div className="tit">비고</div>
                            <div className="cont">
                                <div className="cm-textarea-cont" style={{ display: 'inline-block' }}>
                                    <textarea name="etc" className="cm-textarea" placeholder="의료기기 기타 정보"></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="btm-btn-wrap d-flex">
                            <button type="button" className="cm-btn cm-btn-full-default cm-btn-middle btn-confirm button-submit">
                                등록
                            </button>
                            <button type="button" className="cm-btn cm-btn-middle btn-go-list">
                                목록
                            </button>
                        </div>
                    </form>
                </div>
            );
        };
    },

    'add-bulk': function() {
        return function({onLoad, onLastLoad }) {
            React.useEffect(function() {
                if (String.isNullOrWhitespace(onLoad) === false) {
                    onLoad();
                }
                if (String.isNullOrWhitespace(onLastLoad) === false) {
                    onLastLoad();
                }
            }, []);
            return (
                <div className="common-cont">
                    <div className="sub-cont-top">
                        <h4 className="sub-cont-title">대량등록</h4>
                    </div>
                    <form id="form-data" className="form-data-table">
                        <div className="search-form">
                            <div className="tit require-validation">기관</div>
                            <div className="cont">
                                <div className="select-box-parent-for-organ"></div>
                            </div>

                            <div className="tit require-validation">병동</div>
                            <div className="cont">
                                <div className="select-box-parent-for-ward"></div>
                            </div>

                            <div className="tit require-validation">시리얼번호</div>
                            <div className="cont">
                                <div className="cm-device-search" style={{ width: "auto" }}>
                                    <div className="cm-input-cont" style={{ width: "auto" }}>
                                        <input type="text" className="cm-input-text device-bulk-serial-number-text" placeholder="의료기기 고유 시리얼번호" name="serialNumber" maxLength={7} />
                                    </div>
                                    <button type="button" className="device-search-btn device-bulk-serial-number-add-button">
                                        <span style={{ color: "white", fontSize: "11px" }}>추가</span>
                                    </button>
                                    <button type="button" className="device-search-btn device-bulk-excel-add-button" style={{ width: "50px" }}>
                                        <span style={{ color: "white", fontSize: "11px" }}>엑셀파일</span>
                                    </button>
                                    <div style={{ fontSize: "11px" }}>
                                        (첫번째 시트의 A칼럼의 각 행에 하나씩 등록하고자 하는 시리얼번호 입력)
                                    </div>
                                    <input type="file" id="excel-file-upload" style={{ display: "none" }} />
                                </div>
                                <div className="cm-textarea-cont device-bulk-info-parent" style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}></div>
                            </div>
                        </div>

                        <div className="btm-btn-wrap d-flex">
                            <button type="button" className="cm-btn cm-btn-full-default cm-btn-middle btn-confirm button-submit">
                                등록
                            </button>
                            <button type="button" className="cm-btn cm-btn-middle btn-go-list">목록</button>
                        </div>
                    </form>
                </div>
            );
        };
    }
};