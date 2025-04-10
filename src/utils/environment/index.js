// src/utils/environment/index.js

import { SITE_ENVIRONMENT as SITE_ENVIRONMENT_CONSTANT, SITE_ENVIRONMENT_FOR_CHANGE } from "../../constants/site-environment";
import { useAuth as useAuthNoRender } from "../../hooks/utils-no-render/auth";

const SET = function() {
    const { isAuthenticated, user } = useAuthNoRender();

    if (isAuthenticated === true) {
        SITE_ENVIRONMENT_FOR_CHANGE({
            'TEST_KEY_FOR_USER_NAME': user.name
        });
    }
    for (let key in SITE_ENVIRONMENT_CONSTANT) {
        if (Object.prototype.hasOwnProperty.call(SITE_ENVIRONMENT_CONSTANT, key) === true) {
            window.CONSTANTS.set(`GLOBAL.${key}`, SITE_ENVIRONMENT_CONSTANT[key], true);
        }
    }
};
export { SET };