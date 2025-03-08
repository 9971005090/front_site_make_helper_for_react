// src/designs/content/organ.js
import React from "react";
import { CommonFetch } from "../../../modules/common-fetch";
import { Paging } from "../../../modules/paging2";

export const Design = {
    index: () => {
        return ({paramFetchData, paramSearchFunc, paramCurrentPage, paramItemsPerPage, paramPagesPerPage, onLoadParent, onLoadChild }) => {
            React.useEffect(() => {
                if (onLoadParent) {
                    onLoadParent();
                }
            }, [paramFetchData]);
            return (
                <div className="common-cont">
                    <div className="sub-cont-top">
                        <h4 className="sub-cont-title">Search</h4>
                        <div className="display-flex">
                            <button type="button" className="cm-btn cm-btn-middle btn-black btn-add">등록</button>
                            <button type="button" className="cm-btn cm-btn-middle cm-btn-n-default btn-all-delete">선택 비활성화
                            </button>
                        </div>
                    </div>
                    <form className="form-common-search">
                        <div className="search-form">
                            <div className="tit">활성화 여부</div>
                            <div className="cont">
                                <div className="radio-box">
                                    <div className="radio-btn-cont">
                                        <input type="radio" id="expiration0" name="expiration" className="radio-input use-option" value="0" defaultChecked />
                                        <label htmlFor="expiration0" className="span">활성화</label>
                                    </div>
                                    <div className="radio-btn-cont">
                                        <input type="radio" id="expiration1" name="expiration" className="radio-input use-option" value="1" />
                                        <label htmlFor="expiration1" className="span">비활성화</label>
                                    </div>
                                </div>
                            </div>
                            <div className="tit">검색어</div>
                            <div className="cont">
                                <div className="cm-device-search">
                                    <span className="span d-none">검색</span>
                                    <div className="default-background common-search-input">
                                        <img className="search-icon d-none" src="/assets/images/theme/{{THEME}}/icon/search.png"/>
                                        <input type="text" name="search" className="font-size-14 font-weight-500 search-input-enter form-common-search-keyword" placeholder="기관 이름을 입력해 주세요." />
                                    </div>
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
                                <div style={{ width: "5%" }}></div>
                                <div style={{ width: "15%" }}></div>
                                <div style={{ width: "15%" }}></div>
                                <div style={{ width: "8%" }}></div>
                                <div style={{ width: "8%" }}></div>
                                <div style={{ width: "16%" }}></div>
                                <div style={{ width: "11%" }}></div>
                                <div style={{ width: "11%" }}></div>
                            </div>
                            <div className="cm-thead">
                                <div className="cm-tr">
                                    <div className="cm-th">
                                        <div className="cm-checkbox-box type02 pd-4">
                                            <input className="input" type="checkbox" value="" id="listAllCheck" />
                                        </div>
                                    </div>
                                    <div className="cm-th">코드</div>
                                    <div className="cm-th">이름</div>
                                    <div className="cm-th">HIS 연동여부</div>
                                    <div className="cm-th">장치관리</div>
                                    <div className="cm-th">담당자이메일</div>
                                    <div className="cm-th">비고</div>
                                    <div className="cm-th">관리</div>
                                </div>
                            </div>
                            <div className="cm-tbody" id="contents-by-data-table">
                                <CommonFetch paramFetchData={paramFetchData} paramType={"organ"} paramSearchFunc={paramSearchFunc} paramCurrentPage={paramCurrentPage} onLoadChild={onLoadChild}/>
                            </div>
                        </div>
                    </div>
                    {paramFetchData !== null && paramFetchData.totalCount > 0 ? (
                    <Paging paramSearchFunc={paramSearchFunc} paramFetchData={paramFetchData} paramCurrentPage={paramCurrentPage} paramItemsPerPage={paramItemsPerPage} paramPagesPerPage={paramPagesPerPage} />
                    ) : null}
                </div>
            );
        };
    }
};