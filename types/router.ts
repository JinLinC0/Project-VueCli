import 'vue-router'
import * as ElIcons from '@element-plus/icons-vue';

declare module 'vue-router' {
    interface RouteMeta {
        // 用户相关
        auth?: boolean   // 是否需要登录
        guest?: boolean   // 是否是游客（未登录）访问
        permissions?: string[]  // 访问权限
        
        // 菜单相关
        show?: boolean    // 是否在菜单中显示
        title?: string     // 路由在菜单中的标题
        icon?: keyof typeof ElIcons     // 路由在菜单中的图标
        isClick?: boolean    // 是否选中菜单
    }
}