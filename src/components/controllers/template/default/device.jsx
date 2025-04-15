// src/designs/content/organ.js
import React from "react";
import { CustomSelectBox } from '../../../../components/utils/custom-select-box';

export const Design = {
    index: function() {
        return function({ onLoad, onLastLoad, deviceConstant, THEME, etc }) {
            console.log(":::::Template device start:::::", Date.getNow(), deviceConstant, etc);
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
                        <h4 className="sub-cont-title">Search</h4>
                        <div className="display-flex">
                            <button type="button" className="cm-btn cm-btn-middle btn-black btn-add">등록</button>
                            <button type="button" className="cm-btn cm-btn-middle btn-black btn-add-for-bulk">대량 등록</button>
                            <button type="button" className="cm-btn cm-btn-middle btn-black btn-move-for-choice">선택 이동</button>
                            <button type="button" className="cm-btn cm-btn-middle cm-btn-n-default btn-all-delete" style={{ display: 'none' }}>선택 삭제</button>
                        </div>
                    </div>
                    <form className="form-common-search">
                        <div className="search-form">
                            <div className="tit">기관/ 병동</div>
                            <div className="cont">
                                {/*동적으로 처리를 안하면, 부모 콤포넌트가 리랜더링이 돼서, 이건 동적으로*/}
                                {/*<CustomSelectBox options={etc.organOptions}/>*/}
                                {/*<CustomSelectBox options={etc.wardOptions}/>*/}
                                <div className="select-box-parent-for-organ">처리중...</div>
                                <div className="select-box-parent-for-ward">처리중...</div>
                            </div>
                            <div className="tit">종류</div>
                            <div className="cont">
                                <div className="radio-box">
                                    {Object.entries(deviceConstant.TYPE.TITLE).map(([key, value], index) => (
                                        <div className="radio-btn-cont" key={key}>
                                            <input
                                                type="radio"
                                                id={`device-type${key}`}
                                                name="deviceType"
                                                className="radio-input use-option"
                                                value={key}
                                                defaultChecked={Number(key) === 0}
                                                data-not-parsing-value="0"
                                            />
                                            <label htmlFor={`device-type${key}`} className="span">{value}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="tit">사용</div>
                            <div className="cont">
                                <div className="radio-box">
                                    {[...deviceConstant.USE.TITLE2.entries()].map(([key, value], index) => (
                                        <div className="radio-btn-cont" key={key}>
                                            <input
                                                type="radio"
                                                id={`use${key}`}
                                                name="deviceUseStatus"
                                                className="radio-input use-option"
                                                value={key}
                                                defaultChecked={key === -1}
                                                data-not-parsing-value="-1"
                                            />
                                            <label htmlFor={`use${key}`} className="span">{value}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="tit">검색어</div>
                            <div className="cont">
                                <div className="cm-device-search">
                                    <span className="span d-none">검색</span>
                                    <div className="default-background common-search-input">
                                        <img className="search-icon d-none" src={`/assets/images/theme/${THEME}/icon/search.png`} alt="Search icon" />
                                        <input
                                            type="text"
                                            className="font-size-14 font-weight-500 search-input-enter form-common-search-keyword use-option"
                                            name="search"
                                            placeholder="검색어를 입력해 주세요."
                                        />
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
                                <div style={{ width: '5%' }}></div>
                                <div style={{ width: '5%' }}></div>
                                <div style={{ width: '11%' }}></div>
                                <div style={{ width: '9%' }}></div>
                                <div style={{ width: '9%' }}></div>
                                <div style={{ width: '12%' }}></div>
                                <div style={{ width: '23%' }}></div>
                                <div style={{ width: '14%' }}></div>
                                <div style={{ width: '12%' }}></div>
                            </div>
                            <div className="cm-thead">
                                <div className="cm-tr">
                                    <div className="cm-th">
                                        <div className="cm-checkbox-box type02 pd-4">
                                            <input className="input" type="checkbox" value="" id="listAllCheck" />
                                        </div>
                                    </div>
                                    <div className="cm-th">사용</div>
                                    <div className="cm-th">기관</div>
                                    <div className="cm-th">종류</div>
                                    <div className="cm-th">시리얼번호</div>
                                    <div className="cm-th">맥어드레스</div>
                                    <div className="cm-th">전체사용시간/ 전체사용횟수</div>
                                    <div className="cm-th">등록시간</div>
                                    <div className="cm-th">관리</div>
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