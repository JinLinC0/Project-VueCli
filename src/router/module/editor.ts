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
            meta: { menu: { title: '富文本编辑器' } },
        },
        {
            name: 'markdown',
            path: 'markdown',
            component: () => import('@/views/editor/markdown.vue'),
            // permission: 'editor_markdown'表示拥有editor_markdown权限的用户才能访问
            meta: { permission: 'editor_markdown', menu: { title: 'markdown编辑器' } },
        }
    ]
} as RouteRecordRaw