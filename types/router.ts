import 'vue-router'

declare module 'vue-router' {
    interface RouteMeta {
        auth?: boolean   // 是否需要登录
        guest?: boolean   // 是否是游客（未登录）访问
        show?: boolean    // 是否在菜单中显示
        title?: string     // 路由在菜单中的标题
        icon?: string     // 路由在菜单中的图标
    }
}