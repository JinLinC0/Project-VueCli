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

            // 如果判断为假，验证不通过，从哪里来回哪里去（对于登录后的用户，存在本地token，按理来说是不能访问登录页面的）
            if(this.isGuest(to, token) === false) return from
        })
    }

    // 判断用户是否登录
    private isLogin(route: RouteLocationNormalized, token: any) {
        // 页面不需要进行验证，或者页面需要进行验证，但是用户已经登录（存在token了）
        return Boolean(!route.meta.auth || (route.meta.auth && token))
    }

    // 判断用户是否为游客
    private isGuest(route: RouteLocationNormalized, token: any) {
        // 如果没有设置元信息，页面是可以随便访问的，如果设置了元信息，并且本地没有存在token，那么也可以访问这个页面
        return Boolean(!route.meta.guest || (route.meta.guest && !token))
    }
}

export default (router: Router) => {
    new Guard(router).run();
}