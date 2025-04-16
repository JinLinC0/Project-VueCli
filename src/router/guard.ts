import { RouteLocationNormalized, Router } from "vue-router";

class Guard {
    // 通过构造函数接收传递过来的router
    constructor(private router: Router) {}
    public run() {
        // 配置路由守卫
        this.router.beforeEach((to, from) => {
            // 判断是否登录，如果没有登录，去登录页面
            if(this.isLogin(to) === false) return { name: 'login' }
        })
    }

    // 判断用户是否登录
    private isLogin(route: RouteLocationNormalized) {
        // 返回false，表示用户未认证
        if(route.name !== 'login') return false
    }
}

export default (router: Router) => {
    new Guard(router).run();
}