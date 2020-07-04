/*
 * @Description: 
 * @Author: liu yan
 * @Date: 2020-07-02 10:50:35
 * @LastEditTime: 2020-07-04 11:09:26
 */
export interface Config {
    SUCCESS_CODE: number;

    LOGIN_EXPIRE: number;

    TOKEN_KEY: string;

    theme: 'dark' | 'light';

    fixedHeader: boolean;

    title?: string;
}

const AdminConfig: Config = {

    // 请求成功状态码
    SUCCESS_CODE: 200,

    // 登录过期，或者未登录
    LOGIN_EXPIRE: 400,

    // 本地存储token 的key
    TOKEN_KEY: 'Admin_Token_key',

    // 默认主题颜色
    theme: 'dark',

    // 是否固定头部
    fixedHeader: true,

    // sider显示的logo
    title: 'React Umi admin'
}

export default AdminConfig