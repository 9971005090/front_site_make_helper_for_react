// src/layout/Footer.js
import React, { Suspense } from "react";
export const Footer = () => {
    const [Component, setComponent] = React.useState(null);

    React.useEffect(() => {
        (async () => {
            const { Design } = await import(`./template/${window.CONSTANTS.get(`APP.THEME`)}/footer`);
            setComponent(Design.index);
        })();
    }, []);

    return (
        <Suspense fallback={<div>Header Loading...</div>}>
            {Component ? <Component /> : <p>Data Loading...</p>}
        </Suspense>
    );
};