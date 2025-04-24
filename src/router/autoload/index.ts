import utils from '@/utils'
import getRoutes from './view'
import { RouteRecordRaw } from 'vue-router';
import autoloadModuleRoutes from './module';

let routes = [] as RouteRecordRaw[]

// 如果环境变量中的VITE_ROUTER_AUTOLOAD为true，则使用getRoutes方法获取路由（即使用页面自动注册）
if(utils.env.VITE_ROUTER_AUTOLOAD) {
    routes = getRoutes();
} else {   // 否则使用autoloadModuleRoutes方法获取路由（即使用模块自动注册）
    routes = autoloadModuleRoutes()
}

export default routes