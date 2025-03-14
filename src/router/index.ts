import { App } from "vue";
import { createRouter, createWebHistory } from "vue-router";

// 创建路由
const router = createRouter({
    // 定义路由的使用方式，使用普通的地址栏形式
    history: createWebHistory(),

    // 具体路由的创建
    routes: [
        {
            path: "/",
            component: () => import("../views/home.vue"),
        }
    ]
})

// 将路由封装成函数，实现具名导出
export function setupRouter(app: App) {
    app.use(router)
}

export default router