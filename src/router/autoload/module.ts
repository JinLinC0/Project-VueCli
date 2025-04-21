import { RouteRecordRaw } from "vue-router";

export default function autoloadModuleRoutes() {
    // 同步获取一下module文件夹下的模块文件
    const modules = import.meta.glob('../module/**/*.ts', { eager: true });

    const routes = [] as RouteRecordRaw [];

    Object.keys(modules).forEach(key => {
        routes.push(modules[key].default);   // 将模块中文件中的所有路由注册上
    })

    return routes;
}