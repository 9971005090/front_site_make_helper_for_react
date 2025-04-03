// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/slice/store";
import { format } from 'date-fns';
// import { SETTINGS } from './init/global-settings';
import { INITIALIZE_APP } from './init/initialize-app';
import { LoadingDonut } from "./components/utils/loading-donut";
import { APP as APP_CONSTANTS } from "./constants/app-constants";

import './Css';

const Root = function() {
    console.log(":::::index:::::", format(new Date(), `yyyy-MM-dd HH:mm:ss.SSS`));
    const [ isDone, setIsDone ] = React.useState(false);

    React.useEffect(function() {
        (async function() {
            try {
                await INITIALIZE_APP();
                setIsDone(true);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    if (isDone === false) {
        if (APP_CONSTANTS['APP.INFO.DEBUG.USE'] === `DEVELOPMENT`) {
            return <>Loading site...</> ;
        }
        else {
            return <LoadingDonut />;
        }
    }

    return <App />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <Root />
    </Provider>
);