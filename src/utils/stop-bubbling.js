// src/utils/stop-bulling.js
const stopBubbling = function(event, type = `both`) { // type, event/base/both
    if (event) {
        if (type === `both`) {
            event.stopPropagation(); // 이벤트 버블링 방지
            event.preventDefault(); // 기본 동작 방지 (선택 사항)
        }
        else if (type === `base`) {
            event.preventDefault(); // 기본 동작 방지 (선택 사항)
        }
        else if (type === `event`) {
            event.stopPropagation(); // 이벤트 버블링 방지
        }
    }
};

export { stopBubbling };
