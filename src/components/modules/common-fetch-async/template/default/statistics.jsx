// src/designs/content/commonFetch.js
import React from "react";
import { numberToCurrency } from "../../../../../helpers/custom/statistics/index";

export const Design = {
    index: function() {
        return ( { paramFetchData, now, onLoad } ) => {
            console.log("paramFetchData:::", paramFetchData);
            let measurementPeriodCountList = null;
            if (now) {
                measurementPeriodCountList = paramFetchData.measurementPeriodCountList;
            }
            React.useEffect(function() {
                if (onLoad) {
                    onLoad();
                }
            }, [now]);
            return (
                measurementPeriodCountList !== null && measurementPeriodCountList.length > 0 ? (
                    measurementPeriodCountList.map((item, index) => (
                        <div className="cm-tr" key={`${Date.getNow()}-${item.organizationCode}`}>
                            <div className="cm-td">
                                {item.organizationName}
                            </div>
                            <div className="cm-td">
                                <span className="pc-d-none">총개수</span>
                                {numberToCurrency(item.orgTotalCount)}
                            </div>
                            <div className="cm-td">
                                <span className="pc-d-none">이전수</span>
                                {numberToCurrency(item.beforePeriodCount)}
                            </div>
                            <div className="cm-td">
                                <span className="pc-d-none">검색기간수</span>
                                {numberToCurrency(item.orgPeriodCount)}
                            </div>
                            <div className="cm-td">
                                <span className="pc-d-none">다음수</span>
                                {numberToCurrency(item.afterPeriodCount)}
                            </div>
                        </div>

                    )))
                : (
                <tr>
                    <td colSpan="9" style={{height: "100px", verticalAlign: "middle", textAlign: "center", borderBottom: "1px solid #d9dee3"}}>
                        조회된 데이터가 없습니다.
                    </td>
                </tr>
                )
            );
        };
    }
};
