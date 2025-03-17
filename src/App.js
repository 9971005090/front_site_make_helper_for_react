// src/App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Main } from './components/controllers/main';
import { URL_CHANGE } from './utils/url-change/index';

// css 부르기
import './CssCustom';

function App() {
    console.log(":::::App:::::", Date.getNow());
    const updateMetaTag = (name, content) => {
        const existingMeta = document.querySelector(`meta[name="${name}"]`);
        if (existingMeta) {
            existingMeta.setAttribute('content', content);
        } else {
            const meta = document.createElement('meta');
            meta.name = name;
            meta.content = content;
            document.head.appendChild(meta);
        }
    };

    updateMetaTag('viewport', 'width=device-width, initial-scale=1');
    updateMetaTag('description', 'This is a description for my app.');
    // console.log(`src/App - return 위 - 로딩 - ${format(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS')}`);

    const { url, urlChange } = URL_CHANGE.PROCESS();
    if (urlChange !== null) {
        history.pushState({}, null, urlChange);
    }

    return (
        <Router>
            <Main url={url} />
        </Router>
    );
}

export default App;
