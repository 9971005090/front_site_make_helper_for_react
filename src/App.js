// src/App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Main } from './components/controllers/main';
import { URL_CHANGE } from './utils/url-change/index';
import { SITE_META } from "./constants/site-meta";

// css 부르기
import './CssCustom';

function App() {
    console.log(":::::App:::::", Date.getNow());
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

    return (
        <Router>
            <Main url={url} />
        </Router>
    );
}

export default App;
