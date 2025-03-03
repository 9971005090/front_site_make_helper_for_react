// src/layout/Header.js
import React, { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import $ from "cash-dom";
import { format } from 'date-fns';

import { useAuth } from "../../../hooks/auth";
import { menuAuth } from "../../../hooks/menu";
import { useFirstLoad } from "../../../hooks/first-load";
import stopEvent from "../../../utils/stopEvent";

export const Header = ({ forceReRendering }) => {
    const [Component, setComponent] = React.useState(null);
    const { isAuthenticated, user, logout } = useAuth();
    const { isHeaderChange, isLeftChange, setHeaderChange, setLeftChange } = menuAuth();
    const { isDone, setIsDone } = useFirstLoad();
    const navigate = useNavigate();
    const params = { isAuthenticated, user };
    const [logoutState, setLogoutState] = React.useState(false);

    const selectHeaderMenu = function() {
        // 내용은 디자인에 따라 변경
        ////////////////////////////////////////////////////////////////////
        // 대메뉴의 선택 표시
        $(`.cm-header .cm-top-menu-ul .menu-list`).each(function(index, item) {
            let objInfoDatas = JSON.parse($(item).attr("data-info"));
            if(objInfoDatas.datas.indexOf(window.CONSTANTS.get(`NOW_CONTROLLER`)) !== -1) {
                $(item).removeClass('selected').addClass('selected');
            }
            else {
                $(item).removeClass('selected');
            }
        });
        ////////////////////////////////////////////////////////////////////
    };

    React.useEffect(() => {
        (async () => {
            const { Design } = await import(`./template/${window.CONSTANTS.get(`APP.THEME`)}/header`);
            setComponent(Design.index);
        })();
        selectHeaderMenu();
        // console.log(`header 디자인변경 - ${format(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS')}`);
    }, [isHeaderChange]);

    React.useEffect(() => {
        if (isAuthenticated === false && logoutState === true) {
            navigate(`/login`);
        }
        return () => {
            setLogoutState(false);
        };
    }, [logoutState]);

    React.useEffect(() => {
        if (Component !== null) {
            // 콤포넌트 최초 로딩 후
            ////////////////////////////////////////////////////////////////////
            $(`.logout-button`).off(`click`).on(`click`, function (e) {
                stopEvent(e);
                logout();
                setIsDone(false);
                setLogoutState(true);
                // forceReRendering();
            });

            // 대메뉴의 링크 적용
            $(`.cm-header .cm-top-menu-ul .menu-list`).off(`click`).on(`click`, function (e) {
                stopEvent(e);
                // $("#burger-btn.on").removeClass("on")
                // $(".cm-top-menu.on").removeClass("on")
                const location = $(this).attr("data-location");
                const callback = $(this).attr("data-callback");
                $("#wrap").removeAttr("style");
                if(location !== undefined && location !== "") {
                    if (`/${window.CONSTANTS.get(`NOW_CONTROLLER`)}/${window.CONSTANTS.get(`NOW_ACTION`)}` !== location) {
                        setHeaderChange();
                        navigate(location.toString());
                    }
                }
            });

            selectHeaderMenu();
            return () => {
                $(`.logout-button`).off(`click`);
                $(`.cm-header .cm-top-menu-ul .menu-list`).off(`click`);
            };
            ////////////////////////////////////////////////////////////////////
        }
    }, [Component]); // DesignComponent가 로딩되면 이벤트 설정

    return (
        <Suspense fallback={<div>Header Loading...</div>}>
            {Component ? <Component getParams={params} /> : <p>Data Loading...</p>}
        </Suspense>
    );
};