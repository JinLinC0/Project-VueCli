import { RouteRecordRaw } from 'vue-router';

export default {
    name: 'admin',
    path: '/admin',
    component: () => import('@/layouts/admin.vue'),
    meta: { auth: true },   // 需要登录才能访问，否则跳转到登录页面
    children: [
        {
            name: 'admin.home',
            path: 'home',
            component: () => import('@/views/admin/home.vue')
        }
    ]
} as RouteRecordRaw