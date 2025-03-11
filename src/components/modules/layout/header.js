// src/layout/Header.js
import React from "react";
import { useNavigate } from "react-router-dom";
import $ from "cash-dom";
import { format } from 'date-fns';

import { useLogout } from "../../../hooks/utils/logout";
import { useAuth } from "../../../hooks/auth";
import { menuAuth } from "../../../hooks/menu";
import { useFirstLoad } from "../../../hooks/first-load";
import stopEvent from "../../../utils/stopEvent";
import { CommonReturn } from "../../../components/utils/common-return";

export const Header = ({uriParams}) => {
    const [Component, setComponent] = React.useState(null);
    const { loading, runLogout } = useLogout();
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = React.useState(false);

    const onLoad = () => {
        setIsLoaded(true);
    };

    React.useEffect(() => {
        (async () => {
            const { Design } = await import(`./template/${window.CONSTANTS.get(`APP.THEME`)}/header`);
            setComponent(Design.index);
        })();
    }, [navigate]);

    React.useEffect(() => {
        if (Component !== null && isLoaded === true) {
            ////////////////////////////////////////////////////////////////////
            $(`.logout-button`).off(`click`).on(`click`, function (e) {
                stopEvent(e);
                runLogout();
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
                        navigate(location.toString());
                    }
                }
            });

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

            if (isLoaded === true) {
                setIsLoaded(false);
            }
            return () => {
                // $(`.logout-button`).off(`click`);
                // $(`.cm-header .cm-top-menu-ul .menu-list`).off(`click`);
            };
            ////////////////////////////////////////////////////////////////////
        }
    }, [isLoaded]);

    return CommonReturn(Component)({ loadingTypeTitle: `layout(header)`, onLoad: onLoad, navigate });
};