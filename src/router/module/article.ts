import { RouteRecordRaw } from 'vue-router';

export default {
    name: 'article',
    path: '/article',
    component: () => import('@/layouts/admin.vue'),
    meta: { auth: true, menu: { title: '文章列表', icon: 'Menu' } },
    children: [
        {
            name: 'articleList',
            path: 'articleList',
            component: () => import('@/views/article/article.vue'),
            meta: { menu: { title: '文章列表' } },
        }
    ]
} as RouteRecordRaw