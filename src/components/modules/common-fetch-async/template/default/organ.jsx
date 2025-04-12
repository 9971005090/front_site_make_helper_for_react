// src/designs/content/commonFetch.js
import React from "react";
import { parsingSyncHis, parsingDeviceManagerType } from "../../../../../helpers/custom/organ/index";

export const Design = {
    index: function() {
        return ( { paramFetchData, now, onLoad } ) => {
            let organizationList = null;
            if (now) {
                organizationList = paramFetchData.organizationList;
            }
            React.useEffect(function() {
                if (onLoad) {
                    onLoad();
                }
            }, [now]);
            return (
                organizationList !== null && organizationList.length > 0 ? (
                    organizationList.map((item, index) => (
                <div className="cm-tr" key={item.organizationId} data-id={item.organizationId} data-code={item.organizationCode}>
                    <div className="cm-td " >
                        <div className="cm-checkbox-box type02 pd-4" >
                            <input className="input" type="checkbox" value="" id="checkbox_{item.organizationId}" />
                        </div>
                    </div>
                    <div className="cm-td " >
                        <div className="pc-d-none">
                            <span className="pc-d-none">코드</span>
                        </div>
                        {item.organizationCode}
                    </div>
                    <div className="cm-td " >
                        <div className="pc-d-none">
                            <span className="pc-d-none">이름</span>
                        </div>
                        {item.organizationName}
                    </div>
                    <div className="cm-td " >
                        <div className="pc-d-none">
                            <span className="pc-d-none">HIS 연동여부</span>
                        </div>
                        {parsingSyncHis(item.syncHis)}
                    </div>
                    <div className="cm-td " >
                        <div className="pc-d-none">
                            <span className="pc-d-none">장치관리</span>
                        </div>
                        {parsingDeviceManagerType(item.deviceManagerType)}
                    </div>
                    <div className="cm-td " >
                        <div className="pc-d-none">
                            <span className="pc-d-none">담당자이메일</span>
                        </div>
                        {item.systemManager}
                    </div>
                    <div className="cm-td " >
                        <div className="pc-d-none">
                            <span className="pc-d-none">비고</span>
                        </div>
                        {item.etc}
                    </div>
                    <div className="cm-td " >
                        <div className="btn-wrap" >
                            <button type="button" className="cm-btn cm-btn-small btn-black btn-detail-view button-update">수정</button>
                            <button type="button" className="cm-btn cm-btn-small cm-btn-n-default btn-delete">비활성화</button>
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
