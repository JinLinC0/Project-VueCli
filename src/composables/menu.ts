import { IMenu } from "#/menu";
import { CacheEnum } from "@/enum/cacheEnum";
import router from "@/router";
import utils from "@/utils";
import { ref } from "vue";
import { RouteLocationNormalizedLoaded } from "vue-router";

class Menu {
    public menus = ref<IMenu[]>([])
    public history = ref<IMenu[]>([])
    public close = ref(false)  // 左侧菜单的展开和折叠状态，默认是展开的
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
    // 设置当前菜单的显示和隐藏状态
    setCurrentMenu(route: RouteLocationNormalizedLoaded) {
        this.menus.value.forEach(m => {
            m.isClick = false  // 默认菜单的点击动作设为false
            // 遍历菜单的子菜单
            m.children?.forEach(c => {
                c.isClick = false  // 默认子菜单的点击动作设为false
                // 如果当前路由与子菜单的route属性相等，则设置点击动作为true
                if(c.route === route.name) {
                    // 设置当前菜单的点击状态为true
                    m.isClick = true
                    c.isClick = true
                }
            })
        })
    }
    // 左侧主菜单的展开和折叠控制
    toggleCollapse() {
        this.close.value = !this.close.value
    }
    // 左侧主菜单的切换控制，父级菜单一个展示一个折叠
    toggleParentMenu(menu: IMenu) {
        this.menus.value.forEach(m => {
            m.isClick = false
            if(m === menu) m.isClick = true
        })
    }
}

export default new Menu()