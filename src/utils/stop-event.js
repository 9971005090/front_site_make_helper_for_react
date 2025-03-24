// src/utils/stopEvent.js
const stopEvent = function(event, type = `base`) { // type, event/base/both
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

export default stopEvent;
