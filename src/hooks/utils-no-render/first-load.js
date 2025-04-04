// /src/hooks/utils-no-render/first-load.js

import { store } from "../../redux/slice/store";
import { _setIsDone } from "../../redux/slice/first-load";

export const useFirstLoad = function() {
    const isDone = store.getState().firstLoad._isDone;
    const setIsDone = function(value) {
        store.dispatch(_setIsDone(value));
    };

    return { isDone, setIsDone };
};