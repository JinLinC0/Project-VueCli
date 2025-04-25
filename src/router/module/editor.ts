import { RouteRecordRaw } from 'vue-router';

export default {
    name: 'editor',
    path: '/editor',
    component: () => import('@/layouts/admin.vue'),
    meta: { auth: true, menu: { title: '编辑器', icon: 'Menu' } },
    children: [
        {
            name: 'base',
            path: 'base',
            component: () => import('@/views/editor/base.vue'),
            meta: { menu: { title: '基础编辑器' } },
        },
        {
            name: 'markdown',
            path: 'markdown',
            component: () => import('@/views/editor/markdown.vue'),
            meta: { menu: { title: 'markdown编辑器' } },
        }
    ]
} as RouteRecordRaw