// src/App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from './components/modules/layout/layout';
import { format } from 'date-fns';

// css 부르기
import './Css';
import './CssCustom';

function App() {
    React.useEffect(() => {

        // 메타태그 추가 또는 업데이트
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



        // 동적으로 전역 함수 로딩

    }, []);


    // console.log(`src/App - return 위 - 로딩 - ${format(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS')}`);
    return (
        <Router>
            <Layout />
        </Router>
    );
}

export default App;
