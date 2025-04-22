import { RouteRecordRaw } from 'vue-router';

export default {
    name: 'editor',
    path: '/editor',
    component: () => import('@/layouts/admin.vue'),
    meta: { show: true, title: '编辑器', icon: 'Menu', auth: true },
    children: [
        {
            name: 'base',
            path: 'base',
            component: () => import('@/views/editor/base.vue'),
            meta: { show: true, title: '基础编辑器' },
        },
        {
            name: 'markdown',
            path: 'markdown',
            component: () => import('@/views/editor/markdown.vue'),
            meta: { show: true, title: 'markdown编辑器' },
        }
    ]
} as RouteRecordRaw