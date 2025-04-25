// src/components/modules/layout/left.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { CommonReturn } from "../../../components/utils/common-return";
import $ from "cash-dom";
import { stopBubbling } from "../../../utils/stop-bubbling";
import { LEFT_MENU } from "../../../components/modules/layout/init/left-menu";
import { useVariable as useVariableNoRender } from "../../../hooks/utils-no-render/variable";

const Left = function({ url }) {
    console.log(":::::module > layout > Left:::::", Date.getNow());
    const navigate = useNavigate();
    const [Component, setComponent] = React.useState(null);
    const { get: getVariable } = useVariableNoRender();

    const datas = LEFT_MENU[url.controller].leftMenu.datas;
    for (let i = 0; i < datas.length; i++) {
        datas[i].selected = ``;
        if (datas[i].controller === url.controller && JSON.parse(datas[i].data.info).datas.indexOf(url.action) !== -1) {
            datas[i].selected = ` selected`;
        }
    }

    const setAddEvent = function() {
        $(`.gnb-list`).off(`click`).on(`click`, function(e) {
            stopBubbling(e);
            let location = $(this).attr("data-location");
            let callback = $(this).attr("data-callback");
            if (location !== undefined && location !== "") {
                if (location !== undefined && location !== "") {
                    if (`/${getVariable(`NOW_CONTROLLER`)}/${getVariable(`NOW_ACTION`)}` !== location) {
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
    };

    React.useEffect(function() {
        (async function() {
            const { Design } = await import(`./template/${getVariable(`APP.THEME`)}/left`);
            setComponent(Design.index);
        })();
    }, [navigate]);

    return CommonReturn(Component)({ loadingTypeTitle: `layout(left)`, onLoad: setAddEvent, leftMenu: datas });
};

export { Left };