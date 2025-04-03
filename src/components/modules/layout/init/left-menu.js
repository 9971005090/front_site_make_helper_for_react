const _getLeftMenuData = function(controller) {
    if (controller === `gateway`) {
        return {
            'useController': [`gateway`],
            'datas': [
                {
                    'controller': `gateway`,
                    'name': `게이트웨이`,
                    'data': {
                        'info': `{"datas": ["index", "add", "update"]}`,
                        'location': `/gateway/index`
                    }
                },
                {
                    'controller': `gateway-fw`,
                    'name': `게이트웨이 펌웨어`,
                    'data': {
                        'info': `{"datas": ["index", "add"]}`,
                        'location': `/gateway-fw/index`
                    }
                }
            ]
        };
    }
    else if (controller === `account`) {
        return {
            'useController': [`account`],
            'datas': [
                {
                    'controller': `account`,
                    'name': `계정관리`,
                    'data': {
                        'info': `{"datas": ["index", "add", "update"]}`,
                        'location': `/account/index`
                    }
                },
            ]
        };
    }
    else if (controller === `organ`) {
        return {
            'useController': [`organ`],
            'datas': [
                {
                    'controller': `organ`,
                    'name': `기관`,
                    'data': {
                        'info': `{"datas": ["index", "add", "update"]}`,
                        'location': `/organ/index`
                    }
                },
            ]
        };
    }
    else if (controller === `log`) {
        return {
            'useController': [`log`],
            'datas': [
                {
                    'controller': `log`,
                    'name': `로그`,
                    'data': {
                        'info': `{"datas": ["index"]}`,
                        'location': `/log/index`
                    }
                },
            ]
        };
    }
    else if (controller === `device`) {
        return {
            'useController': [`device`],
            'datas': [
                {
                    'controller': `device`,
                    'name': `의료기기`,
                    'data': {
                        'info': `{"datas": ["index", "add", "add-bulk"]}`,
                        'location': `/device/index`
                    }
                }
            ]
        };
    }
    else if (controller === `notice`) {
        return {
            'useController': [`notice`],
            'datas': [
                {
                    'controller': `notice`,
                    'name': `공지사항`,
                    'data': {
                        'info': `{"datas": ["index", "add", "update"]}`,
                        'location': `/notice/index`
                    }
                }
            ]
        };
    }
    else if (controller === `statistics`) {
        return {
            'useController': [`statistics`],
            'datas': [
                {
                    'controller': `statistics`,
                    'name': `검색기간-합계`,
                    'data': {
                        'info': `{"datas": ["index"]}`,
                        'location': `/statistics/index`
                    }
                },
                {
                    'controller': `statistics`,
                    'name': `검색기간-일별`,
                    'data': {
                        'info': `{"datas": ["day"]}`,
                        'location': `/statistics/day`
                    }
                }
            ]
        };
    }
    else if (controller === `sw-version`) {
        return {
            'useController': [`sw-version`],
            'datas': [
                {
                    'controller': `sw-version`,
                    'name': `SW 버전`,
                    'data': {
                        'info': `{"datas": ["index", "add", "update"]}`,
                        'location': `/sw-version/index`
                    }
                }
            ]
        };
    }
    return null;
};

const LEFT_MENU = {
    'gateway': {
        'leftMenu': _getLeftMenuData(`gateway`)
    },
    'gateway-fw': {
        'leftMenu': _getLeftMenuData(`gateway`)
    },
    'account': {
        'leftMenu': _getLeftMenuData(`account`)
    },
    'organ': {
        'leftMenu': _getLeftMenuData(`organ`)
    },
    'log': {
        'leftMenu': _getLeftMenuData(`log`)
    },
    'device': {
        'leftMenu': _getLeftMenuData(`device`)
    },
    'statistics': {
        'leftMenu': _getLeftMenuData(`statistics`)
    },
    'notice': {
        'leftMenu': _getLeftMenuData(`notice`)
    },
    'sw-version': {
        'leftMenu': _getLeftMenuData(`sw-version`)
    }
};

export { LEFT_MENU };