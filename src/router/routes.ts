import { RouteRecordRaw } from "vue-router"

// 抽离路由的具体内容，方便管理
const routes = [
    {
        // 定义网站主页
        path: "/",
        name: "home",
        component: () => import("@/views/home.vue")
    },
    {
        // 登录注册路由
        path: "/login",
        name: "login",
        component: () => import("@/views/auth/login.vue")
    }
] as RouteRecordRaw[]   // 声明类型，用于存放路由的数组

export default routes