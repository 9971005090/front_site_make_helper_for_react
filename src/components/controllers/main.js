// src/components/controllers/main.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Pre } from '../../components/controllers/pre';
import { Layout } from '../../components/modules/layout';
import { Post } from '../../components/controllers/post';
import { URL_CHANGE } from '../../utils/url-change/index';

export const Main = function() {
    console.log(":::::Main:::::", Date.getNow());
    const location = useLocation();
    console.log("location::::", location);
    const navigate = useNavigate();
    const onLastLoad = function() {
        Post(); // 메인 내용 모두 처리 후 가장 마지막에 실행을 해야하는데, 그걸 알 수 없음
    };
    Pre();
    const url = URL_CHANGE.PROCESS(location);
    return <Layout url={url} onLastLoad={onLastLoad}/>;
};