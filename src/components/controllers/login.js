// src/components/controllers/login.js
import React from "react";
import { CommonReturn } from "../../components/utils/common-return";

const Controller = {
    index: () => {
        return ({ uriParams, onLastLoad }) => {
            const [Component, setComponent] = React.useState(null);

            React.useEffect(() => {
                (async () => {
                    const { ModuleController } = await import(`../modules/login/login`);
                    setComponent(ModuleController.index);
                })();
            }, []);

            // console.log(`src/layout/Layout - return 위 - 로딩 - ${format(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS')}`);
            return CommonReturn(Component)({onLastLoad: onLastLoad});
        };
    },
};

export { Controller };