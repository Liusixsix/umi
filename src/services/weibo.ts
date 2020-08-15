import request from '@/utils/request';

export interface getBlogList {
    userName: string;
    pageIndex: number;
    pageSize: number;
}

export interface BlogContent {
    id: number;
    content: string;
}
export async function queryTableList(params: getBlogList) {
    return request('/api/admin/getBlogList', {
        method: 'post',
        data: params
    });
}

export async function deleteBlogById(id: number) {
    return request('/api/admin/deleteBlog', {
        method: 'get',
        params:  {id}
    });
}


export async function updataBlogContent(params:BlogContent) {
    return request('/api/admin/updataBlogContent', {
        method: 'post',
        data:params
    });
}
