// src/hooks/useRouteChange.js


const subscribers = new Set();

const notifySubscribers = () => {
    subscribers.forEach(function(callback) {
        callback();
        subscribers.delete(callback);
    });
};

// URL 변경 감지 (history 변경 감지)
const originalPushState = history.pushState;
const originalReplaceState = history.replaceState;

history.pushState = function (...args) {
    originalPushState.apply(history, args);
    notifySubscribers();
};

history.replaceState = function (...args) {
    originalReplaceState.apply(history, args);
    notifySubscribers();
};

window.addEventListener("popstate", notifySubscribers);


// ✅ 일반 함수에서도 URL 변경 감지 가능
export const subscribeToRouteChange = (callback) => {
    subscribers.add(callback);
    return () => {
        subscribers.delete(callback);
    };
};
