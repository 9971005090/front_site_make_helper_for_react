// src/layout/Layout.js
import React, { Suspense } from "react";
import { format } from 'date-fns';

import { useAuth } from "../../../hooks/auth";
import Controller from '../../controllers';
import { notify, CustomModal } from '../../../utils/globalUtils';

export const Layout = () => {
    const { isAuthenticated } = useAuth();
    const [Component, setComponent] = React.useState(null);

    React.useEffect(() => {
        (async () => {
            if (isAuthenticated === true) {
                const { Design } = await import(`./template/${window.CONSTANTS.get(`APP.THEME`)}/layout`);
                setComponent(Design.index);
            }
            else {
                setComponent(() => {
                    function _d() {
                        return <><Controller /></>;
                    }
                    return _d;
                });
            }
        })();
    }, [isAuthenticated]);

    // console.log(`src/layout/Layout - return 위 - 로딩 - ${format(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS')}`);
    return (
        <Suspense fallback={<div>File Loading...</div>}>
            {Component ? <Component /> : <p>Data Loading...</p>}
        </Suspense>

    );
};