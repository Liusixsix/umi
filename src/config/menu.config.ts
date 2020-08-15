/*
 * @Description:
 * @Author: liu yan
 * @Date: 2020-07-01 16:12:28
 * @LastEditTime: 2020-07-04 11:30:18
 */
import {
    DesktopOutlined,
} from '@ant-design/icons';

export interface MenusDate {
    title: string;
    link: string;
    key: string;
    icon: string;
    children?: any;
}

const Menus: MenusDate[] = [
    {
        title: '首页',
        link: '/dashboard',
        key: 'dashboard',
        icon: 'icon-shouye',
        children: [],
    },
    {
        title: '列表页',
        link: '/list',
        key: 'list',
        icon: 'icon-text_icon',
        children: [
            {
                title: '查询列表',
                link: '/list/queryTable',
                key: 'queryTable',
                icon: 'icon-jiludanzilishijilu',
                children: [],
            },
        ],
    },
    {
        title: '个人页',
        link: '/account',
        key: 'account',
        icon: 'icon-yonghu',
        children: [
            {
                title: '个人页',
                link: '/account/settings',
                key: 'settings',
                icon: 'icon-faxian',
                children: [],
            },
        ],
    }, {
        title: '微博管理',
        link: '/weibo',
        key: 'weibo',
        icon: 'icon-yonghu',
        children: [
            {
                title: '微博列表',
                link: '/weibo/list',
                key: 'list',
                icon: 'icon-faxian',
            },
        ],
    },
];

export default Menus
