import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import $ from "cash-dom";


export const Paging = ({ searchFunc, totalCount, currentPage, itemsPerPage, pagesPerPage }) => {
    // 페이지 클릭 시 데이터를 변경하는 핸들러
    const handlePageClick = async (event) => {
        if (event.selected < 0) {
            searchFunc(1);
        }
        else {
            searchFunc(event.selected + 1);
        }
    };

    // 스타일 추가
    ////////////////////////////////////////////////////////////////////
    (async () => {
        await import (`./assets/css/${window.CONSTANTS.get(`APP.THEME`)}/index.css`);
    })();
    ////////////////////////////////////////////////////////////////////

    return (
        <>
            <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                pageCount={Math.ceil(totalCount / itemsPerPage)} // 총 아이템 수로 페이지 수 계산
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"selected"}
                pagesPerPage={pagesPerPage} // 한 번에 보여줄 페이지 번호의 수
                pageRangeDisplayed={pagesPerPage}         // 페이
                previousClassName="btn btn-page btn-page-prev"
                nextClassName="btn btn-page btn-page-next"          // 다음 버튼의 클래스
                pageClassName="page-item paging-btn"
                pageLinkClassName="btn btn-number"    // 페이지 번호 버튼에 적용할 링크 클래스
            />
        </>
    );
};
