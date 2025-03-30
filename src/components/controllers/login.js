// src/components/controllers/login.js
import React from "react";
import { CommonReturn } from "../../components/utils/common-return";

const Controller = {
    index: function() {
        console.log(":::::controller login:::::", Date.getNow());
        return ({ url, onLastLoad }) => {
            const [Component, setComponent] = React.useState(null);

            React.useEffect(function() {
                (async function() {
                    const { ModuleController } = await import(`../modules/login/login`);
                    setComponent(ModuleController.index);
                })();
            }, []);

            return CommonReturn(Component)({onLastLoad: onLastLoad});
        };
    },
};

export { Controller };