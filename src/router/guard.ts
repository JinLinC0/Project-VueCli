import menu from "@/composables/menu";
import { CacheEnum } from "@/enum/cacheEnum";
import menuStore from "@/store/menuStore";
import userStore from "@/store/userStore";
import utils from "@/utils";
import { RouteLocationNormalized, Router } from "vue-router";

class Guard {
    // 通过构造函数接收传递过来的router
    constructor(private router: Router) { }
    public run() {
        // 调用路由守卫
        this.router.beforeEach(this.beforeEach.bind(this))
    }

    // 定义路由守卫
    private async beforeEach(to: RouteLocationNormalized, from: RouteLocationNormalized) {
        // 判断是否登录，如果没有登录，去登录页面
        if (this.isLogin(to) === false) return { name: 'login' }
        // 如果判断为假，验证不通过，从哪里来回哪里去（对于登录后的用户，存在本地token，按理来说是不能访问登录页面的）
        if (this.isGuest(to) === false) return from
        // 获取用户资料
        await this.getUserInfo()

        // 记录历史路由
        menuStore().addHistoryMenu(to)
        menu.addHistoryMenu(to)
    }

    // 获取用户资料
    private getUserInfo() {
        // 调用全局状态中的用户信息，前提是token存在
        if (this.token()) {
            return userStore().getUserInfo()
        }
    }

    // 将获取token的方法封装成一个函数，其返回值是字符串或者null
    private token(): string | null {
        return utils.store.get(CacheEnum.TOKEN_NAME)
    }

    // 判断用户是否登录   登录用户访问
    private isLogin(route: RouteLocationNormalized) {
        // 页面不需要进行验证，或者页面需要进行验证，但是用户已经登录（存在token了）
        const state = Boolean(!route.meta.auth || (route.meta.auth && this.token()))
        if (state === false) {
            utils.store.set(CacheEnum.REDIRECT_ROUTE_NAME, route.name); // 存储当前路由，用于登录后跳转回当前的路由
        }
        return state
    }

    // 判断用户是否为游客   游客访问
    private isGuest(route: RouteLocationNormalized) {
        // 如果没有设置元信息，页面是可以随便访问的，如果设置了元信息，并且本地没有存在token，那么也可以访问这个页面
        return Boolean(!route.meta.guest || (route.meta.guest && !this.token()))
    }
}

export default (router: Router) => {
    new Guard(router).run();
}