/*
 * @Description:
 * @Author: liu yan
 * @Date: 2020-07-01 16:12:28
 * @LastEditTime: 2020-07-04 14:35:01
 */
import { defineConfig } from 'umi';
import { resolve } from 'path';

export default defineConfig({
    title: '管理平台业务模版',
    hash: true,
    antd: {},
    dva: {
        hmr: true,
    },
    locale: {
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        antd: true,
        baseNavigator: true,
    },
    // 是否启用按需加载
    // dynamicImport: {},
    // 设置 node_modules 目录下依赖文件的编译方式
    nodeModulesTransform: {
        type: 'none',
    },
    targets: {
        ie: 11,
    },
    theme: {
        // '@primary-color': '#1DA57A',
    },
    styles: [
        '//at.alicdn.com/t/font_796928_kbvr5337m8.css'
    ],
    scripts: [

    ],
    proxy: {
        '/api': {
            target: 'http://localhost:3000/',
            changeOrigin: true,
            pathRewrite: { '^/api': 'api' },
        },
    },
});
