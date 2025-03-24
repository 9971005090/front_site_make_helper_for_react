// src/components/modules/layout/header.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import $ from "cash-dom";
import { useLogout } from "../../../hooks/utils/logout";
import { stopBubbling } from "../../../utils/stop-bubbling";
import { CommonReturn } from "../../../components/utils/common-return";

const Header = function({ url }) {
    const [Component, setComponent] = React.useState(null);
    const { loading, runLogout } = useLogout();
    const location = useLocation();
    const navigate = useNavigate();

    const setAddEvent = function() {
        // setIsLoaded(true);
        console.log("header onload::::", Date.getNow());
        $(`.logout-button`).off(`click`).on(`click`, function(e) {
            stopBubbling(e);
            runLogout();
        });

        // 대메뉴의 링크 적용
        $(`.cm-header .cm-top-menu-ul .menu-list`).off(`click`).on(`click`, function(e) {
            stopBubbling(e);
            // $("#burger-btn.on").removeClass("on")
            // $(".cm-top-menu.on").removeClass("on")
            const _location = $(this).attr("data-location");
            const _callback = $(this).attr("data-callback");
            $("#wrap").removeAttr("style");
            if (String.isNullOrWhitespace(location) === false) {
                if (`/${window.CONSTANTS.get(`NOW_CONTROLLER`)}/${window.CONSTANTS.get(`NOW_ACTION`)}` !== _location) {
                    navigate(_location.toString(), {state: {back: location.pathname}});
                    console.log(":::::header:::::", Date.getNow());
                }
            }
        });

        // 대메뉴의 선택 표시
        $(`.cm-header .cm-top-menu-ul .menu-list`).each(function(index, item) {
            let objInfoDatas = JSON.parse($(item).attr("data-info"));
            if (objInfoDatas.datas.indexOf(window.CONSTANTS.get(`NOW_CONTROLLER`)) !== -1) {
                $(item).removeClass('selected').addClass('selected');
            }
            else {
                $(item).removeClass('selected');
            }
        });
    };

    React.useEffect(function() {
        (async function() {
            const { Design } = await import(`./template/${window.CONSTANTS.get(`APP.THEME`)}/header`);
            setComponent(Design.index);
        })();
    }, []);

    return CommonReturn(Component)({ loadingTypeTitle: `layout(header)`, onLoad: setAddEvent });
};

export { Header };