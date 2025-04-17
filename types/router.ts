import 'vue-router'

declare module 'vue-router' {
    interface RouteMeta {
        auth?: boolean   // 是否需要登录
    }
}