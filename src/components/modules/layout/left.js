// src/layout/Left.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { CommonReturn } from "../../../components/utils/common-return";
import $ from "cash-dom";
import stopEvent from "../../../utils/stopEvent";
import { LEFT_MENU } from "../../../components/modules/layout/init/left-menu";
export const Left = ({ uriParams }) => {
    const navigate = useNavigate();
    const [Component, setComponent] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);
    // const [leftMenu, setLeftMenu] = React.useState(null);

    const datas = LEFT_MENU[uriParams.controllerName].leftMenu.datas;
    for (let i = 0; i < datas.length; i++) {
        datas[i].selected = ``;
        if (datas[i].controller === uriParams.controllerName && JSON.parse(datas[i].data.info).datas.indexOf(uriParams.actionName) !== -1) {
            datas[i].selected = ` selected`;
        }
    }
    const [leftMenu, setLeftMenu] = React.useState(datas);
    const onLoad = () => {
        setIsLoaded(true);
    };

    React.useEffect(() => {
        (async () => {
            const { Design } = await import(`./template/${window.CONSTANTS.get(`APP.THEME`)}/left`);
            setComponent(Design.index);
        })();
    }, [navigate]);

    React.useEffect(() => {
        if (Component !== null && isLoaded === true) {
            ////////////////////////////////////////////////////////////////////

            $(`.gnb-list`).off(`click`).on(`click`, function (e) {
                stopEvent(e);
                let location = $(this).attr("data-location");
                let callback = $(this).attr("data-callback");
                if(location !== undefined && location !== "") {
                    if(location !== undefined && location !== "") {
                        if (`/${window.CONSTANTS.get(`NOW_CONTROLLER`)}/${window.CONSTANTS.get(`NOW_ACTION`)}` !== location) {
                            navigate(location.toString());
                        }
                    }
                }
            });

            // 대메뉴 선택 정보 확인
            const choiceMenu = {
                header: {
                    name: null,
                    location: null
                },
                left: {
                    name: null,
                    location: null
                },
            };
            $(`.cm-header .cm-top-menu-ul .menu-list`).each(function(index, item) {
                if ($(item).hasClass(`selected`) === true) {
                    choiceMenu.header.name = $(item).text();
                    choiceMenu.header.location = $(this).attr("data-location").toString();
                    return false;
                }
            });
            $(`.cm-left-nav-section.nav-type-long .gnb-list`).each(function(index, item) {
                if ($(item).hasClass(`selected`)) {
                    choiceMenu.left.name = $(item).text();
                    choiceMenu.left.location = $(this).attr("data-location").toString();
                    return false;
                }
            });
            $(`.cm-main-content .page-title`).text(choiceMenu.header.name);
            $(`.cm-main-content .page-nav .page-nav-link.controller`).text(choiceMenu.header.name);
            $(`.cm-main-content .page-nav .page-nav-link.action`).text(choiceMenu.left.name);

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

    return CommonReturn(Component)({ loadingTypeTitle: `layout(left)`, onLoad: onLoad, leftMenu: leftMenu });
};