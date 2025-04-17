import { store } from "@/utils";
import { RouteLocationNormalized, Router } from "vue-router";

class Guard {
    // 通过构造函数接收传递过来的router
    constructor(private router: Router) {}
    public run() {
        // 配置路由守卫
        this.router.beforeEach((to, from) => {
            // 获取本地存储中的token
            let token = store.get('token')?.token
            // 判断是否登录，如果没有登录，去登录页面
            if(this.isLogin(to, token) === false) return { name: 'login' }
        })
    }

    // 判断用户是否登录
    private isLogin(route: RouteLocationNormalized, token: any) {
        // 页面不需要进行验证，或者页面需要进行验证，但是用户已经登录（存在token了）
        return Boolean(!route.meta.auth || (route.meta.auth && token))
    }
}

export default (router: Router) => {
    new Guard(router).run();
}