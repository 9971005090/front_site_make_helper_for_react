// src/utils/domHelper.js
const domHelperCore = {
    element: null,
    _eventHandlers: {},

    select(selector) {
        this.element = document.querySelectorAll(selector); // NodeList 반환
        return this; // 체이닝을 위해 현재 객체 반환
    },

    off(eventType) {
        if (this.element && this._eventHandlers[eventType]) {
            this.element.forEach(el => {
                el.removeEventListener(eventType, this._eventHandlers[eventType]); // 해당 이벤트 제거
            });
            delete this._eventHandlers[eventType]; // 핸들러 제거
        }
        return this; // 체이닝을 위해 현재 객체 반환
    },

    on(eventType, callback) {
        if (!this._eventHandlers) this._eventHandlers = {}; // 이벤트 핸들러 저장을 위한 객체 초기화
        this._eventHandlers[eventType] = callback;

        if (this.element) {
            this.element.forEach((el) => {
                el.addEventListener(eventType, (e) => {
                    callback(el, e); // `this`를 현재 요소로 설정
                });
            });
        }
        return this; // 체이닝을 위해 현재 객체 반환
    },

    val() {
        if (this.element) {
            return this.element[0].value; // 첫 번째 요소의 값 반환
        }
        return null;
    },

    parent() {
        if (this.element) {
            return this.element[0].parentElement; // 첫 번째 요소의 부모 반환
        }
        return null;
    },

    find(selector) {
        if (this.element) {
            return this.element[0].querySelectorAll(selector); // 첫 번째 요소에서 자식 선택
        }
        return [];
    },

    isChecked() {
        if (this.element) {
            const el = this.element[0];
            if (el instanceof HTMLInputElement && (el.type === 'checkbox' || el.type === 'radio')) {
                return el.checked;
            }
            throw new Error("isChecked can only be used on checkbox or radio input elements.");
        }
        throw new Error("No element selected. Use select() to select an element first.");
    },

    // length 속성을 사용할 수 있도록 메서드를 추가
    get length() {
        return this.element ? this.element.length : 0;
    },
};

// Proxy를 사용해 기본 메서드로 select를 설정
const domHelper = new Proxy(function(selector) {
    return domHelperCore.select.call(domHelperCore, selector);
}, {
    get(target, prop, receiver) {
        if (prop in domHelperCore) {
            return domHelperCore[prop].bind(domHelperCore); // 프로퍼티가 domHelperCore에 있으면 해당 메서드를 바인딩하여 반환
        }
        return undefined;
    }
});

export default domHelper;
