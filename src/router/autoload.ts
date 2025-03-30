import { RouteRecordRaw } from "vue-router";
import { env } from "@/utils/helper"
// 自动加载路由，目前只支持layouts和views文件夹，views文件夹中的.vue文件作为子路由（和layouts同子目录的生效）

// layouts文件夹中模块页面文件的路由自动注册
// 获取layouts文件夹中的所有.vue文件
const layouts = import.meta.glob('../layouts/*.vue', { eager: true });
// 获取views文件夹中所有的.vue文件，可以遍历到子目录，这个文件中的.vue文件作为子路由
const views = import.meta.glob('../views/**/*.vue', { eager: true });

/**
 * @description 根据路由需要的字段进行填充
 * @params file 文件名
 * @params module 模块
 * @returns 返回生成的路由配置
*/
function getRouteByModule(file: string, module: { [key: string]: any }) {
    // 通过正则表达式，获取文件名的前缀，如admin.vue文件，获取admin字符串
    const name = file.replace(/.+layouts\/|.+views\/|\.vue/gi, '');
    // 定义具体的路由
    const route = {
        path: `/${name}`,
        name: name.replace('/', '.'),
        component: module.default,
    } as RouteRecordRaw
    // 如果模块中存在route字段，则合并到route中，使用页面自定义的路由规则
    return Object.assign(route, module.default?.route)
}

/**
 * @description 遍历提取子路由
 * @params layoutRoute 父级路由的配置
 * @returns 返回生成子路由的配置
*/
function getChildrenRoutes(layoutRoute: RouteRecordRaw) {
    const routes = [] as RouteRecordRaw[]
    // 遍历所有视图
    Object.entries(views).forEach(([file, module]) => {
        if(file.includes(`../views/${layoutRoute.name as string}`)) {
            const route = getRouteByModule(file, module!)
            routes.push(route)
        }
    })
    return routes
}

/**
 * @description 获得路由数组的函数
 * @returns 返回生成路由的配置，包含父级路由和子路由
*/
function getRoutes() {
    const layoutRoutes = [] as RouteRecordRaw[]
    Object.entries(layouts).forEach(([file, module]) => {
        const route = getRouteByModule(file, module!)
        // 提取子路由
        route.children = getChildrenRoutes(route)
        layoutRoutes.push(route)
    })
    return layoutRoutes
}

// 根据环境变量，决定是否加载路由
const routes = env.VITE_ROUTER_AUTOLOAD ? getRoutes() : [] as RouteRecordRaw[]

// 最终返回一个动态路由
export default routes