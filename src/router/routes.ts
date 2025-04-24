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
        component: () => import("@/views/auth/login.vue"),
        meta: { guest: true }   // 游客才能访问，登录后就不能进行访问
    },
    {
        // 404页面路由
        path: "/:any(.*)",
        name: "notFound",
        component: () => import("@/views/errors/404.vue"),
    }
] as RouteRecordRaw[]   // 声明类型，用于存放路由的数组

export default routes