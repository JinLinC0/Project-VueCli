import 'vue-router'

declare module 'vue-router' {
    interface RouteMeta {
        auth?: boolean   // 是否需要登录
        guest?: boolean   // 是否是游客（未登录）访问
    }
}