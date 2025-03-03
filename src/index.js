import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/slice/store";
import { SETTINGS } from './init/global-settings';
import { INITIALIZE_APP } from './init/initialize-app';


const Root = () => {
    const [ isDone, setIsDone ] = React.useState(false);

    React.useEffect(() => {
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