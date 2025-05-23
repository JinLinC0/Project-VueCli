import { RouteRecordRaw } from 'vue-router';

export default {
    name: 'functional',
    path: '/functional',
    component: () => import('@/layouts/admin.vue'),
    meta: { auth: true, menu: { title: '功能组件', icon: 'Menu' } },
    children: [
        {
            name: 'digitalClock',
            path: 'digitalClock',
            component: () => import('@/views/functional/clock.vue'),
            meta: { menu: { title: '实时时间' } },
        },
        {
            name: 'weather',
            path: 'weather',
            component: () => import('@/views/functional/weather.vue'),
            meta: { menu: { title: '实时天气' } },
        }
    ]
} as RouteRecordRaw