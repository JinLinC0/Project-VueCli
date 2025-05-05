import utils from '@/utils'
import getRoutes from './view'
import { Router, RouteRecordRaw } from 'vue-router';
import autoloadModuleRoutes from './module';
import userStore from '@/store/userStore';

// 如果环境变量中的VITE_ROUTER_AUTOLOAD为true，则使用getRoutes方法获取路由（即使用页面自动注册）
let routes: RouteRecordRaw[] = utils.env.VITE_ROUTER_AUTOLOAD ? getRoutes() : autoloadModuleRoutes();

function autoload(router: Router) {
    const user = userStore()  // 读取用户的资料
    // 自动注册路由，并且根据用户资料，将没有权限的路由过滤掉，只保留有权限的路由进行注册
    // 对于路由不需要任何权限的，直接进行自动注册，如果有设置权限的，我们进行过滤验证
    routes = routes.map(route => {
        route.children = route.children?.filter(r => {
            const permission = r.meta?.permission
            return permission ? user.info?.permissions.includes(permission) : true
        })
        return route
    })
    // 自动注册路由
    routes.forEach(r => router.addRoute(r))
}

export default autoload