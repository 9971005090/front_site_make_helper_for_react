import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/slice/store";
import settings from './init/globalSettings';
import {initializeApp} from './init/initializeApp';


const Root = () => {
    const {isFirstLoadDataDone, runFirstLoadData} = settings();

    React.useEffect(() => {
        (async function() {
            try {
                await initializeApp();
                runFirstLoadData();
            } catch (error) {
                console.error(error);
            }
        })();

    }, []);

    if (isFirstLoadDataDone() === false) {
        return <>Loading...</>;  // 앱 준비가 완료될 때까지 로딩 화면 표시
    }

    return <App />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <Root />
    </Provider>
);