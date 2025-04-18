// src/designs/content/commonFetch.js
import React from "react";
import { numberToCurrency } from "../../../../../helpers/custom/statistics/index";

export const Design = {
    index: function() {
        return ( { paramFetchData, now, onLoad } ) => {
            console.log("paramFetchData:::", paramFetchData);
            let measurementOrgDayCountList = null;
            if (now) {
                measurementOrgDayCountList = paramFetchData.measurementOrgDayCountList;
            }
            React.useEffect(function() {
                if (onLoad) {
                    onLoad();
                }
            }, [now]);
            return (
                measurementOrgDayCountList !== null && measurementOrgDayCountList.length > 0 ? (
                        measurementOrgDayCountList.map((item, index) => (
                        <div className="cm-tr" key={`${Date.getNow()}-${item.date}`}>
                            <div className="cm-td">
                                <span className="pc-d-none">날짜</span>
                                {item.date}
                            </div>
                            <div className="cm-td">
                                <span className="pc-d-none">개수</span>
                                {numberToCurrency(item.dayCount)}
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
