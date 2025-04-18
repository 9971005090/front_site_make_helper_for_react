// src/utils/initialize-app.js
import { GET_CONSTANTS } from "../constants/global-set-constants";
import { APP as APP_CONSTANT } from "../constants/app";
import { USER as USER_CONSTANT } from "../constants/user-level";
import { COMMON_RESPONSE_CODE as COMMON_RESPONSE_CODE_CONSTANT } from "../constants/common-response-code";
import { SET as SITE_ENVIRONMENT_FOR_SET } from "../utils/environment/index";

const showSiteLoadingLog = function(msg, textColor = `#0088FF`, backgroundColor = `#CADFF1`) {
    console.log(`%c:::::::::::::${msg}:::::::::::`, `color:${textColor}; background:${backgroundColor}`);
};
const allDynamicScripts = [];
const preFileLoading = function() {
    // 규칙: .js, .css 로 끝나야 하며, .은 한개만 사용한다.
    this.runType = "program"; // install(최초 체크), program(사이트 설치 후 실행 시)
    this.files = [];
    this.fileCount = 0;
    this.errorAfterType = "ignore"; // stop(에러처리), ignore(무시하고 진행)
    this.callback = null;
    this.setInit = function(options = null) {
        if (options !== null) {
            if (Object.prototype.hasOwnProperty.call(options, `hasOwnProperty`) === true) {
                this.runType = options.runType;
            }
            if (Object.prototype.hasOwnProperty.call(options, `files`) === true) {
                for(let i = 0; i < options.files.length; i++) {
                    if (options.files[i] !== null && allDynamicScripts.indexOf(options.files[i]) === -1) {
                        this.files.push(options.files[i]);
                        allDynamicScripts.push(options.files[i]);
                    }
                }
            }
            if (Object.prototype.hasOwnProperty.call(options, `errorAfterType`) === true) {
                this.errorAfterType = options.errorAfterType;
            }
            if (Object.prototype.hasOwnProperty.call(options, `"callback"`) === true) {
                this.callback = options.callback;
            }
        }
        this.fileCount = this.files.length;
    };
    this.done = function(name) {
        if (--this.fileCount <= 0) {
            if (this.callback !== null) {
                this.callback();
            }
        }
    };
    this.run = function() {
        let _self = this;
        if (this.fileCount > 0) {
            for(let i = 0; i < this.files.length; i++) {
                let tagName = "script";
                let type = "text/javascript";
                if (this.files[i].indexOf(".css") !== -1) {
                    tagName = "link";
                    type = "text/css";
                }
                let file = document.createElement(tagName);
                file.type = type;
                if (this.files[i].indexOf(".js") !== -1) {
                    file.src = this.files[i];
                }
                else if (this.files[i].indexOf(".css") !== -1) {
                    file.href = this.files[i];
                    file.rel = "stylesheet";
                }
                file.async = false;
                file.defer = true;
                document.head.appendChild( file );
                file.onload = function () {
                    _self.done(this.src);
                };
                file.onerror = function() {
                    showSiteLoadingLog(`파일 로딩 실패!, 파일주소(${file})`, `#EF0232`, `#f8c1cd`);
                };
            }
        }
        else {
            this.done();
        }
    };
};

const INITIALIZE_APP = async function() {
    try {
        // 초기 데이터 로딩
        await import(`../utils/extensions/string`);
        await import(`../utils/extensions/number`);
        await import(`../utils/extensions/date`);
        await import(`../utils/extensions/array`);
        await import(`../utils/extensions/file`);
        window.CONSTANTS = GET_CONSTANTS(APP_CONSTANT);
        window.CONSTANTS.set(`APP.USER_LEVEL`, USER_CONSTANT.LEVEL);
        window.CONSTANTS.set(`APP.USER_LIMIT`, USER_CONSTANT.LIMIT);
        window.CONSTANTS.set(`APP.API.RESPONSE_CODE`, COMMON_RESPONSE_CODE_CONSTANT);
        SITE_ENVIRONMENT_FOR_SET();
    }
    catch (error) {
        console.error('앱 초기화 실패:', error);
        return false;
    }
};

export { INITIALIZE_APP };