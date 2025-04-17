import React from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import "moment/locale/ko";
import $ from "cash-dom";


const CustomDatetime = ({ info }) => {
    const [value, setValue] = React.useState(info.default);
    const [isOpen, setIsOpen] = React.useState(false);

    // 날짜가 선택될 때 달력 닫기
    const handleDateChange = (date) => {
        setValue(date);
        setIsOpen(false); // 날짜 선택 시 달력 닫기
    };

    // 날짜 입력 필드 클릭 시 열기
    const handleInputClick = () => {
        setIsOpen(true);
    };

    // 달력 아이콘 클릭 시 열기
    const handleIconClick = () => {
        setIsOpen((prevState) => !prevState); // 열려 있으면 닫고, 닫혀 있으면 열기
    };

    React.useEffect(function() {
        $('canvas').filter(function() {
            if ($(this).css('z-index') === '1000000000') {
                $(this).remove();
                return false;
            }
        });
    }, []);

    const styles = `
        .${info.class.parent} {
            display: flex;
            align-items: center;
            background: var(--white);
            border: 1px solid #e5e5e5;
            border-radius: 4px;
            cursor: pointer;
            padding: 0 10px;
            transition: all 0.2s ease-out;
            gap: 8px;
            width: auto;
            height: auto;
        }
        .${info.class.parent} .${info.class.child} {
            width: 72px;
            height: 30px;
            flex: auto;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
        }
        .${info.class.parent} .calendar-icon {
            display: block;
            width: 16px;
            height: 16px;
            mask-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUgOVY4SDNWOUg1WiIgZmlsbD0iIzAwNDQ4OCIvPgo8cGF0aCBkPSJNNSAxMFYxMUgzVjEwSDVaIiBmaWxsPSIjMDA0NDg4Ii8+CjxwYXRoIGQ9Ik05IDhIN1Y5SDlWOFoiIGZpbGw9IiMwMDQ0ODgiLz4KPHBhdGggZD0iTTcgMTBIOVYxMUg3VjEwWiIgZmlsbD0iIzAwNDQ4OCIvPgo8cGF0aCBkPSJNMTMgOVY4SDExVjlIMTNaIiBmaWxsPSIjMDA0NDg4Ii8+CjxwYXRoIGQ9Ik0xMyAxMFYxMUgxMVYxMEgxM1oiIGZpbGw9IiMwMDQ0ODgiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zLjUgMEMzLjIyMzg2IDAgMyAwLjIyMzg1OCAzIDAuNVYySDJDMC44OTU0MzEgMiAwIDIuODk1NDMgMCA0VjE0QzAgMTUuMTA0NiAwLjg5NTQzMSAxNiAyIDE2SDE0QzE1LjEwNDYgMTYgMTYgMTUuMTA0NiAxNiAxNFY0QzE2IDIuODk1NDMgMTUuMTA0NiAyIDE0IDJIMTNWMC41QzEzIDAuMjIzODU4IDEyLjc3NjEgMCAxMi41IDBDMTIuMjIzOSAwIDEyIDAuMjIzODU4IDEyIDAuNVYySDRWMC41QzQgMC4yMjM4NTggMy43NzYxNCAwIDMuNSAwWk0xNSA1VjRDMTUgMy40NDc3MiAxNC41NTIzIDMgMTQgM0gyQzEuNDQ3NzIgMyAxIDMuNDQ3NzIgMSA0VjVIMTVaTTEgNlYxNEMxIDE0LjU1MjMgMS40NDc3MiAxNSAyIDE1SDE0QzE0LjU1MjMgMTUgMTUgMTQuNTUyMyAxNSAxNFY2SDFaIiBmaWxsPSIjMDA0NDg4Ii8+CjxwYXRoIGQ9Ik01IDEyVjEzSDNWMTJINVoiIGZpbGw9IiMwMDQ0ODgiLz4KPHBhdGggZD0iTTcgMTJIOVYxM0g3VjEyWiIgZmlsbD0iIzAwNDQ4OCIvPgo8cGF0aCBkPSJNMTMgMTJWMTNIMTFWMTJIMTNaIiBmaWxsPSIjMDA0NDg4Ii8+Cjwvc3ZnPgo=);
            mask-repeat: no-repeat;
            mask-position: center;
            mask-size: cover;
            -webkit-mask-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUgOVY4SDNWOUg1WiIgZmlsbD0iIzAwNDQ4OCIvPgo8cGF0aCBkPSJNNSAxMFYxMUgzVjEwSDVaIiBmaWxsPSIjMDA0NDg4Ii8+CjxwYXRoIGQ9Ik05IDhIN1Y5SDlWOFoiIGZpbGw9IiMwMDQ0ODgiLz4KPHBhdGggZD0iTTcgMTBIOVYxMUg3VjEwWiIgZmlsbD0iIzAwNDQ4OCIvPgo8cGF0aCBkPSJNMTMgOVY4SDExVjlIMTNaIiBmaWxsPSIjMDA0NDg4Ii8+CjxwYXRoIGQ9Ik0xMyAxMFYxMUgxMVYxMEgxM1oiIGZpbGw9IiMwMDQ0ODgiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zLjUgMEMzLjIyMzg2IDAgMyAwLjIyMzg1OCAzIDAuNVYySDJDMC44OTU0MzEgMiAwIDIuODk1NDMgMCA0VjE0QzAgMTUuMTA0NiAwLjg5NTQzMSAxNiAyIDE2SDE0QzE1LjEwNDYgMTYgMTYgMTUuMTA0NiAxNiAxNFY0QzE2IDIuODk1NDMgMTUuMTA0NiAyIDE0IDJIMTNWMC41QzEzIDAuMjIzODU4IDEyLjc3NjEgMCAxMi41IDBDMTIuMjIzOSAwIDEyIDAuMjIzODU4IDEyIDAuNVYySDRWMC41QzQgMC4yMjM4NTggMy43NzYxNCAwIDMuNSAwWk0xNSA1VjRDMTUgMy40NDc3MiAxNC41NTIzIDMgMTQgM0gyQzEuNDQ3NzIgMyAxIDMuNDQ3NzIgMSA0VjVIMTVaTTEgNlYxNEMxIDE0LjU1MjMgMS40NDc3MiAxNSAyIDE1SDE0QzE0LjU1MjMgMTUgMTUgMTQuNTUyMyAxNSAxNFY2SDFaIiBmaWxsPSIjMDA0NDg4Ii8+CjxwYXRoIGQ9Ik01IDEyVjEzSDNWMTJINVoiIGZpbGw9IiMwMDQ0ODgiLz4KPHBhdGggZD0iTTcgMTJIOVYxM0g3VjEyWiIgZmlsbD0iIzAwNDQ4OCIvPgo8cGF0aCBkPSJNMTMgMTJWMTNIMTFWMTJIMTNaIiBmaWxsPSIjMDA0NDg4Ii8+Cjwvc3ZnPgo=);
            -webkit-mask-repeat: no-repeat;
            -webkit-mask-position: center;
            -webkit-mask-size: cover;
            background: #001122;
        }
        
        .rdtPicker th.rdtSwitch {
            margin: 0 0em;
            line-height: 16px;
            text-align: center;
            font-size: 14px;
            padding: 0px;
            font-weight: bold;
        }
        
        .rdtPicker .rdtDays table thead tr:nth-child(2) > th {
            font-size: 14px !important;
        }
        .rdtPicker .rdtDays table tbody tr td {
            border-radius: 100%;
            width: 32px;
            height: 32px;
            cursor: pointer;
            padding: 4px;
            text-align: center;
            font-size: 12px;
        }
        
        .rdtPicker .rdtDays table thead tr:nth-child(2) th:nth-child(1) {
            color: red !important;
        }
        .rdtPicker .rdtDays table thead tr:nth-child(2) th:nth-child(7) {
            color: #0099ff !important;
        }
        .rdtPicker .rdtDays table tbody tr td:nth-child(1) {
            color: red !important;
        }
        .rdtPicker .rdtDays table tbody tr td:nth-child(7) {
            color: #0099ff !important;
        }
        
        .ui-datepicker-calendar>tbody>tr>td:first-child a {
            color: red !important;
        }
        
        .rdtPicker td.rdtOld,
        .rdtPicker td.rdtNew {
          visibility: hidden;  /* 셀 내용과 배경을 모두 숨깁니다 */
        }
    `;
    return (
        <>
            <style>{styles}</style>
            <div className={info.class.parent}>
                <span className="calendar-icon" onClick={handleIconClick}></span>
                <Datetime
                    open={isOpen}
                    onChange={handleDateChange}
                    value={value}
                    dateFormat="YYYY-MM-DD"
                    timeFormat={false}
                    inputProps={{ name: info.name, id: info.id, className: `${info.class.child} ${info.useOption === true && 'use-option'}`,  onClick: handleInputClick }}
                    locale="ko"
                    onFocus={handleInputClick}
                />
            </div>
        </>
    );
};
export { CustomDatetime };