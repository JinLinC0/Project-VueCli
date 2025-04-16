import { App } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import layoutRoutes from "./autoload";
import guard from "./guard";

// 创建路由
const router = createRouter({
    // 定义路由的使用方式，使用普通的地址栏形式
    history: createWebHistory(),
    // 具体路由的创建
    routes: [...routes, ...layoutRoutes]
})

// 将路由封装成函数，实现具名导出
export function setupRouter(app: App) {
    // 执行路由守卫函数，将路由传递过去
    guard(router)
    app.use(router)
}

export default router