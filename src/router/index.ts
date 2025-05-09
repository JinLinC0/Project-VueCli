import { App } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import autoload from "./autoload";
import guard from "./guard";
import userStore from "@/store/userStore";

// 创建路由
const router = createRouter({
    // 定义路由的使用方式，使用普通的地址栏形式
    history: createWebHistory(),
    // 具体路由的创建
    routes: [...routes]
})

// 将路由封装成函数，实现具名导出
export async function setupRouter(app: App) {
    // 获取用户资料  在启动的时候，就加载用户信息
    await userStore().getUserInfo()
    autoload(router)
    // 执行路由守卫函数，将路由传递过去
    guard(router)
    app.use(router)
}

export default router