// src/designs/content/commonFetch.js
import React from "react";
import { parsingSyncHis, parsingDeviceManagerType } from "../../../../../helpers/parsing-organ";

export const Design = {
    index: function() {
        return ( { paramFetchData, now, onLoad } ) => {
            let deviceRegisterList = null;
            if (now) {
                deviceRegisterList = paramFetchData.deviceRegisterList;
            }
            React.useEffect(function() {
                if (onLoad) {
                    onLoad();
                }
            }, [now]);
            return (
                deviceRegisterList !== null && deviceRegisterList.length > 0 ? (
                    deviceRegisterList.map((item, index) => (
                        <div key={item.serialNumber} className="cm-tr" data-serial-number={item.serialNumber}>
                            <div className="cm-td">
                                {item.deviceUseStatus === 0 && (
                                    <div className="cm-checkbox-box type02 pd-4">
                                        <input className="input" type="checkbox" value="" id={`checkbox_${item.serialNumber}`} />
                                    </div>
                                )}
                            </div>
                            <div className="cm-td">
                                <span className="pc-d-none">사용</span>
                                {item.deviceUseStatus === 1 ? 'O' : 'X'}
                            </div>
                            <div className="cm-td">
                                <span className="pc-d-none">기관</span>
                            </div>
                            <div className="cm-td">
                                <span className="pc-d-none">종류</span>
                            </div>
                            <div className="cm-td">
                                <span className="pc-d-none">시리얼번호</span>
                                {item.serialNumber}
                            </div>
                            <div className="cm-td">
                                <span className="pc-d-none">맥어드레스</span>
                                {item.macAddress}
                            </div>
                            <div className="cm-td">
                                <span className="pc-d-none">전체사용시간/ 전체사용횟수</span>
                            </div>
                            <div className="cm-td">
                                <span className="pc-d-none">등록시간</span>
                                {item.dateTime}
                            </div>
                            <div className="cm-td">
                                <div className="btn-wrap" style={{ minHeight: '32px' }}>
                                    {/* <button type="button" className="cm-btn cm-btn-small btn-black btn-detail-view button-update">수정</button> */}
                                    <button
                                        type="button"
                                        className="cm-btn cm-btn-small cm-btn-n-default btn-delete"
                                        style={item.deviceUseStatus !== 0 ? { display: 'none' } : {}}
                                    >
                                        삭제
                                    </button>
                                </div>
                            </div>
                        </div>

                    )))
                : (
                <tr>
                    <td colSpan="8" style={{height: "100px", verticalAlign: "middle", textAlign: "center", borderBottom: "1px solid #d9dee3"}}>
                        조회된 데이터가 없습니다.
                    </td>
                </tr>
                )
            );
        };
    }
};
