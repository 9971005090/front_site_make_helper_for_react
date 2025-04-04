// src/App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Main } from './components/controllers/main';
import { URL_CHANGE } from './utils/url-change/index';
import { SITE_META } from "./constants/site-meta";
import { POST_CHECK as AUTH_POST_CHECK } from './init/auth/post-check';
import { PUSH_STATE as HISTORY_PUSH_STATE } from "./utils/history/index";
import { useAuth as useAuthNoRender } from "./hooks/utils-no-render/auth";

// css 부르기
import './CssCustom';

function App() {
    console.log(":::::App:::::", Date.getNow());
    // 랜더링이 안되려면 직접 조회해서 사용해야한다.
    // const isAuthenticated = store.getState().auth._isAuthenticated;
    // const user = store.getState().auth._user;
    const { isAuthenticated, user } = useAuthNoRender();
    const updateMetaTag = function(name, content, isProperty = false) {
        const selector = isProperty === true ? `meta[property="${name}"]` : `meta[name="${name}"]`;
        const existingMeta = document.querySelector(selector);

        if (existingMeta) {
            existingMeta.setAttribute(`content`, content);
        } 
        else {
            const meta = document.createElement(`meta`);
            if (isProperty) {
                meta.setAttribute(`property`, name);
            } else {
                meta.setAttribute(`name`, name);
            }
            meta.setAttribute(`content`, content);
            document.head.appendChild(meta);
        }
    };

    document.title = SITE_META.NAME;
    
    updateMetaTag(`name`, SITE_META.NAME);
    updateMetaTag(`type`, SITE_META.TYPE);
    updateMetaTag(`title`, SITE_META.TITLE);
    updateMetaTag(`description`, SITE_META.DESCRIPTION);
    updateMetaTag(`keywords`, SITE_META.KEYWORDS);
    updateMetaTag(`author`, SITE_META.AUTHOR);

    updateMetaTag(`og:name`, SITE_META.NAME, true);
    updateMetaTag(`og:type`, SITE_META.TYPE, true);
    updateMetaTag(`og:title`, SITE_META.TITLE, true);
    updateMetaTag(`og:description`, SITE_META.DESCRIPTION, true);
    updateMetaTag(`og:keywords`, SITE_META.KEYWORDS, true);
    updateMetaTag(`og:author`, SITE_META.AUTHOR, true);
    updateMetaTag(`og:image`, SITE_META.IMAGE, true);
    updateMetaTag(`og:image:width`, SITE_META.IMAGE_WIDTH, true);
    updateMetaTag(`og:image:height`, SITE_META.IMAGE_HEIGHT, true);
    updateMetaTag(`og:url`, SITE_META.URL, true);

    const url = URL_CHANGE.PROCESS();

    // post auth 검사
    if (isAuthenticated === true) {
        const _r = AUTH_POST_CHECK(user.level, {isUse: true, msg: null});
        if (_r === `AUTH_FAIL`) {
            url['controller'] = `login`;
            url['action'] = null;
            if (document.location.pathname.indexOf(`login`) === -1) {
                url.change.path = `/${url['controller']}`;
            }
        }
    }

    if (String.isNullOrWhitespace(url.change.path) === false) {
        HISTORY_PUSH_STATE(url.change.path);
    }
    return (
        <Router>
            <Main url={url} />
        </Router>
    );
}

export default App;
