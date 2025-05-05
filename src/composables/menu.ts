import { IMenu } from "#/menu";
import { CacheEnum } from "@/enum/cacheEnum";
import router from "@/router";
import utils from "@/utils";
import { ref } from "vue";

class Menu {
    public menus = ref<IMenu[]>([])
    public history = ref<IMenu[]>([])
    constructor() {}
    init() {
        this.menus.value = this.getMenusByRoute()
        this.history.value = utils.store.get(CacheEnum.HISTORY_MENU) ?? []
    }
    // 根据路由来获取菜单，获取路由（读取我们所有可用的路由）
    getMenusByRoute() {
        // 先要对读取的路由进行过滤，先读父级路由，过滤包含子路由的父级路由，并且元信息中的show为true
        return router.getRoutes().filter(route => route.children.length && route.meta.menu)
            .map(route => {
                let menu: IMenu = { ...route.meta?.menu }
                // 再对子路由进行过滤，过滤掉meta中的show信息不为true的路由
                menu.children = route.children.filter(route => route.meta?.menu).map(route => {
                    return { ...route.meta?.menu, route: route.name }
                }) as IMenu[]
                return menu
            }).filter(menu => menu.children?.length) as IMenu[];    // 当子菜单路由为空时，父级路由也过滤掉，不在菜单中显示
    }
}

export default new Menu()