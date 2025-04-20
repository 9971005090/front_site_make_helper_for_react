

const PUSH_STATE = function(url = null, title = null) {
    if (url !== null) {
        window.history.pushState({}, title, url);
    }
};

export { PUSH_STATE };