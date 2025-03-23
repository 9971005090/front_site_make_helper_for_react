// src/components/modules/custom-alert/index.js
import $ from "cash-dom";
import { Notify } from '../../../../../utils/global-utils';
import { stopBubbling } from "../../../../../utils/stop-bubbling";

const event = function(parsingValue) {
    $(`.customAlertButtonForOk`).off(`click`).on(`click`, async function(e) {
        stopBubbling(e);
        if(Object.prototype.hasOwnProperty.call(parsingValue, `button`) === true && Object.prototype.hasOwnProperty.call(parsingValue.button, `ok`) === true && Object.prototype.hasOwnProperty.call(parsingValue.button.ok, `callback`) === true && parsingValue.button.ok.callback !== null) {
            if (Array.isArray(parsingValue.button.ok.callback) === true) {
                for(let i = 0; i < parsingValue.button.ok.callback.length; i++) {
                    parsingValue.button.ok.callback[i].name(...parsingValue.button.ok.callback[i].params);
                }
            }
        }
    });

    $(`.customAlertButtonForCancel`).off(`click`).on(`click`, async function(e) {
        stopBubbling(e);
        if(Object.prototype.hasOwnProperty.call(parsingValue, `button`) === true && Object.prototype.hasOwnProperty.call(parsingValue.button, `cancel`) === true && Object.prototype.hasOwnProperty.call(parsingValue.button.cancel, `callback`) === true && parsingValue.button.cancel.callback !== null) {
            if (Array.isArray(parsingValue.button.cancel.callback) === true) {
                for(let i = 0; i < parsingValue.button.cancel.callback.length; i++) {
                    parsingValue.button.cancel.callback[i].name(...parsingValue.button.cancel.callback[i].params);
                }
            }
        }
    });

    $(`.customAlertButtonForDelete`).off(`click`).on(`click`, async function(e) {
        stopBubbling(e);
        if(Object.prototype.hasOwnProperty.call(parsingValue, `button`) === true && Object.prototype.hasOwnProperty.call(parsingValue.button, `del`) === true && Object.prototype.hasOwnProperty.call(parsingValue.button.del, `callback`) === true && parsingValue.button.del.callback !== null) {
            if (Array.isArray(parsingValue.button.del.callback) === true) {
                for(let i = 0; i < parsingValue.button.del.callback.length; i++) {
                    parsingValue.button.del.callback[i].name(...parsingValue.button.del.callback[i].params);
                }
            }
        }
    });
};

export { event };