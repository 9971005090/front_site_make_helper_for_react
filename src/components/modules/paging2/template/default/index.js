// src/designs/content/login.js
import React from "react";

export const Design = {
    index: () => {
        return ({ pagingInfo }) => {
            return (
                <ul className="pagination">
                    { pagingInfo.methodView.first === true && (
                        <li className="organ page-item paging-btn paging-btn-double disabled">
                            <button type="button" className="btn btn-page btn-page-first" aria-label="First"></button>
                        </li>
                    )}
                    { pagingInfo.methodView.prev === true && (
                        <li className="organ page-item paging-btn disabled">
                            <button type="button" className="btn btn-page btn-page-prev" aria-label="Prev">
                                <i className="fa fa-play" style={{transform: "rotate(180deg)"}}></i>
                            </button>
                        </li>
                    )}
                    { pagingInfo.page.numbers.map((page, index) => (
                        <li key={page.number} className={`organ page-item paging-btn ${page.active ? 'selected' : ''}`} aria-current="page">
                            <span className="btn btn-number">{page.number}</span>
                        </li>
                    ))}
                    { pagingInfo.methodView.next === true && (
                        <li className="organ page-item paging-btn mr-4 ml-12">
                            <button type="button" className="btn btn-page btn-page-next" aria-label="Next" style={{cursor: "pointer"}}>&gt;</button>
                        </li>
                    )}
                    { pagingInfo.methodView.last === true && (
                        <li className="organ page-item paging-btn paging-btn-double">
                            <button type="button" className="btn btn-page btn-page-last" aria-label="Last" style={{cursor: "pointer"}}>&gt;&gt;</button>
                        </li>
                    )}
                </ul>
            );
        };
    }
};