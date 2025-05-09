import menu from "@/composables/menu";
import { CacheEnum } from "@/enum/cacheEnum";
import menuStore from "@/store/menuStore";
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
        if (to.meta.auth && !this.token()) return { name: 'login' }
        // 如果判断为假，验证不通过，从哪里来回哪里去（对于登录后的用户，存在本地token，按理来说是不能访问登录页面的）
        if (to.meta.guest && this.token()) return from

        // 记录历史路由
        menuStore().addHistoryMenu(to)
        menu.addHistoryMenu(to)
    }

    // 将获取token的方法封装成一个函数，其返回值是字符串或者null
    private token(): string | null {
        return utils.store.get(CacheEnum.TOKEN_NAME)
    }
}

export default (router: Router) => {
    new Guard(router).run();
}