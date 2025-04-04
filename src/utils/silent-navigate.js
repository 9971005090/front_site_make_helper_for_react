// src/utils/silent-navigate.js

const silentNavigate = function(newPath, state = {}, title = null) {
    window.history.pushState(state, title, newPath);
    window.dispatchEvent(new PopStateEvent(`popstate`));
};

export { silentNavigate };