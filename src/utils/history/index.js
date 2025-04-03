

const PUSH_STATE = function(url = null, title = null) {
    if (url !== null) {
        history.pushState({}, title, url);
    }
};

export { PUSH_STATE };