import 'vue-router'
import { IMenu } from '#/menu';

declare module 'vue-router' {
    interface RouteMeta {
        // 用户相关
        auth?: boolean   // 是否需要登录
        guest?: boolean   // 是否是游客（未登录）访问
    
        menu?: IMenu
        permission?: string  // 不同模块的访问权限
    }
}