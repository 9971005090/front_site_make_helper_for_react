// src/layout/Layout.js
import React, { Suspense } from "react";

const Controller = {
    index: () => {
        // 디자인 컴포넌트를 반환
        return ({getParams}) => {
            const [Component, setComponent] = React.useState(null);

            React.useEffect(() => {
                (async () => {
                    const { ModuleController } = await import(`../modules/login/login`);
                    setComponent(ModuleController.index);
                })();
            }, []);

            // console.log(`src/layout/Layout - return 위 - 로딩 - ${format(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS')}`);
            return (
                <Suspense fallback={<div>File Loading...</div>}>
                    {Component ? <Component /> : <p>Data Loading...</p>}
                </Suspense>
            );
        };
    },
};

export { Controller };