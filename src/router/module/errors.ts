import { RouteRecordRaw } from 'vue-router';

export default {
    name: 'error',
    path: '/error',
    component: () => import('@/layouts/error.vue'),
    meta: { show: true, title: '错误页面', icon: 'error'},
    children: [
        {
            name: 'error.404',
            path: '404',
            component: () => import('@/views/errors/404.vue')
        },
        {
            name: 'error.403',
            path: '403',
            component: () => import('@/views/errors/403.vue')
        }
    ]
} as RouteRecordRaw