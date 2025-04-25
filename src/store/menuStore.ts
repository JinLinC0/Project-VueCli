import { defineStore } from "pinia";
import router from "@/router";
import { IMenu } from "#/menu";
import { RouteLocationNormalized } from "vue-router";
import utils from "@/utils";
import { CacheEnum } from "@/enum/cacheEnum";

export default defineStore("menu", {
    state: () => {  // 里面定义了我们的数据 
        return {
            menus: [] as IMenu[],  // 获取菜单
            historyMenus: [] as IMenu[]  // 获取历史菜单
        }
    },
    actions: {
        // 执行init方法初始化菜单
        init() {
            this.getMenusByRoute()  // 初始化左侧菜单栏内容
            this.historyMenus = utils.store.get(CacheEnum.HISTORY_MENU) ?? []  // 初始化历史菜单，没有的时候就为空数组
        },
        // 根据路由来获取菜单，获取路由（读取我们所有可用的路由）
        getMenusByRoute() {
            // 先要对读取的路由进行过滤，先读父级路由，过滤包含子路由的父级路由，并且元信息中的show为true
            this.menus = router.getRoutes().filter(route => route.children.length && route.meta.menu)
                .map(route => {
                    let menu: IMenu = { ...route.meta?.menu }
                    // 再对子路由进行过滤，过滤掉meta中的show信息不为true的路由
                    menu.children = route.children.filter(route => route.meta?.menu).map(route => {
                        return { ...route.meta?.menu, route: route.name }
                    }) as IMenu[]
                    return menu
                }).filter(menu => menu.children?.length) as IMenu[];    // 当子菜单路由为空时，父级路由也过滤掉，不在菜单中显示
        },
        // 添加历史菜单
        addHistoryMenu(route: RouteLocationNormalized) {
            if (!route.meta?.menu) return  // 如果该路由没有菜单信息，则不进行添加
            const menu: IMenu = { ...route.meta?.menu, route: route.name as string }
            // 判断历史菜单中该路由是否存在，如果存在则不压入数组
            const isHas = this.historyMenus.some(menu => menu.route === route.name)
            if (!isHas) {
                this.historyMenus.unshift(menu)   // 往前面进行追加
            }
            // 如果历史菜单数量超过10个，则删除最后一个
            if (this.historyMenus.length > 10) {
                this.historyMenus.pop()
            }
            // 将历史菜单进行存储，防止浏览器刷新时丢失
            utils.store.set(CacheEnum.HISTORY_MENU, this.historyMenus)
        },
        // 删除历史菜单
        removeHistoryMenu(menu: IMenu) {
            const index = this.historyMenus.indexOf(menu)
            this.historyMenus.splice(index, 1)
        }
    },
})