
/**
 * 루트 컴포넌트
 * @fileoverview
 * 1. 페이지 제목 및 메타 태그 업데이트 (사이트 정보, SEO 설정 등).
 * 2. 사용자의 기본 인증이 아닌, 추가적인 인증 확인 처리
 * 3. 최초 접속시 동적 라우팅 처리
 * # URL_CHANGE.PROCESS() 를 main 에서도 공통으로 사용하는 이유는 history.pushState 를 한곳인 main 에서 처리를 하기 위해
 */

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Main } from './components/controllers/main';
import { URL_CHANGE } from './utils/url-change/index';
import { SITE_META as SITE_META_CONSTANT } from "./constants/site-meta";
import { POST_CHECK as AUTH_POST_CHECK } from './init/auth/post-check';
import { useAuth as useAuthNoRender } from "./hooks/utils-no-render/auth";

// css 부르기
import './CssCustom';

function App() {
    console.log(":::::App:::::", Date.getNow());

    // 랜더링이 안되려면 직접 조회해서 사용해야한다.
    const { isAuthenticated, user } = useAuthNoRender();

    /**
     * 메타 값 업데이트 함수
     *
     * @param {string} name - 메타 태그의 이름 또는 속성(property)
     * @param {string} content - 설정할 메타 태그 값
     * @param {boolean} [isProperty=false] - (선택적) `property` 속성 사용 여부 (기본값: `false`)
     *
     * @description
     *  - 사이트의 기본 콤포넌트 APP 처리전 head 영역의 메타의 정보를 업데이트 한다.
     *  - 기존 태그가 있으면 `content` 값을 업데이트하고, 없으면 새로 생성하여 추가한다.
     *
     * @example
     *  updateMetaTag("name", SITE_META_CONSTANT.NAME);
     *  updateMetaTag("og:title", "사이트 제목", true);
     *
     * @returns {void}
     */
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

    document.title = SITE_META_CONSTANT.NAME;
    
    updateMetaTag(`name`, SITE_META_CONSTANT.NAME);
    updateMetaTag(`type`, SITE_META_CONSTANT.TYPE);
    updateMetaTag(`title`, SITE_META_CONSTANT.TITLE);
    updateMetaTag(`description`, SITE_META_CONSTANT.DESCRIPTION);
    updateMetaTag(`keywords`, SITE_META_CONSTANT.KEYWORDS);
    updateMetaTag(`author`, SITE_META_CONSTANT.AUTHOR);

    updateMetaTag(`og:name`, SITE_META_CONSTANT.NAME, true);
    updateMetaTag(`og:type`, SITE_META_CONSTANT.TYPE, true);
    updateMetaTag(`og:title`, SITE_META_CONSTANT.TITLE, true);
    updateMetaTag(`og:description`, SITE_META_CONSTANT.DESCRIPTION, true);
    updateMetaTag(`og:keywords`, SITE_META_CONSTANT.KEYWORDS, true);
    updateMetaTag(`og:author`, SITE_META_CONSTANT.AUTHOR, true);
    updateMetaTag(`og:image`, SITE_META_CONSTANT.IMAGE, true);
    updateMetaTag(`og:image:width`, SITE_META_CONSTANT.IMAGE_WIDTH, true);
    updateMetaTag(`og:image:height`, SITE_META_CONSTANT.IMAGE_HEIGHT, true);
    updateMetaTag(`og:url`, SITE_META_CONSTANT.URL, true);

    const url = URL_CHANGE.PROCESS();

    /**
     * 추가적인 인증 검사를 처리한다.
     *
     * - 예) 도메인을 공유하여 계정 권한별 접속 되는 사이트가 다를 경우 등
     * - `AUTH_POST_CHECK`를 호출하여 사용자 권한을 확인하고, 실패 시 로그인 페이지로 이동할 수 있게 url.change.path 값 변경
     */
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

    /**
     * Router에서 직접 주소를 관리하지 않고, 동적으로 처리하도록 설정한다.
     *
     * - 동적 라우팅 규칙
     *   - 기본 URL 구조: `도메인/controller/action`
     *   - 현재 구현 방식:
     *     - `controller`: 하나의 메뉴 또는 그룹을 의미
     *     - `action`: 해당 메뉴의 세부 처리 기능
     */
    return (
        <Router>
            <Main url={url} />
        </Router>
    );
}

export default App;
