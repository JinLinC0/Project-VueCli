import { IMenu } from "#/menu";
import { CacheEnum } from "@/enum/cacheEnum";
import router from "@/router";
import utils from "@/utils";
import store from "@/utils/store";
import { ref } from "vue";
import { RouteLocationNormalized, RouteLocationNormalizedLoaded, RouteRecordRaw } from "vue-router";

class Menu {
    public menus = ref<IMenu[]>([])
    public history = ref<IMenu[]>([])
    public close = ref(store.get(CacheEnum.MENU_IS_CLOSE) ?? true)  // 左侧菜单的展开和折叠状态，默认是展开的
    public route = ref(null as null | RouteLocationNormalized)   // 用于面包屑组件的路由路径

    constructor() { }
    init() {
        this.menus.value = this.getMenusByRoute()
        this.history.value = this.getHistoryMenu()
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
    // 获取历史菜单
    private getHistoryMenu() {
        // 获取历史菜单之前，先进行权限的过滤（将本地存储的不符合权限的路由过滤掉）
        const routes = [] as RouteRecordRaw[]
        router.getRoutes().map(r => routes.push(...r.children))
        let menus: IMenu[] = utils.store.get(CacheEnum.HISTORY_MENU) ?? []
        return menus.filter(m => {
            return routes.some(r => r.name === m.route)
        })
    }
    // 添加历史菜单
    addHistoryMenu(route: RouteLocationNormalized) {
        if (!route.meta?.menu) return  // 如果该路由没有菜单信息，则不进行添加
        this.route.value = route
        const menu: IMenu = { ...route.meta?.menu, route: route.name as string }
        // 判断历史菜单中该路由是否存在，如果存在则不压入数组
        const isHas = this.history.value.some(menu => menu.route === route.name)
        if (!isHas) {
            this.history.value.unshift(menu)   // 往前面进行追加
        }
        // 如果历史菜单数量超过10个，则删除最后一个
        if (this.history.value.length > 10) {
            this.history.value.pop()
        }
        // 将历史菜单进行存储，防止浏览器刷新时丢失
        utils.store.set(CacheEnum.HISTORY_MENU, this.history.value)
    }
    // 删除历史菜单
    removeHistoryMenu(menu: IMenu) {
        const index = this.history.value.indexOf(menu)
        this.history.value.splice(index, 1)
        utils.store.set(CacheEnum.HISTORY_MENU, this.history.value)
    }
    // 设置当前菜单的显示和隐藏状态
    setCurrentMenu(route: RouteLocationNormalizedLoaded) {
        this.menus.value.forEach(m => {
            m.isClick = false  // 默认菜单的点击动作设为false
            // 遍历菜单的子菜单
            m.children?.forEach(c => {
                c.isClick = false  // 默认子菜单的点击动作设为false
                // 如果当前路由与子菜单的route属性相等，则设置点击动作为true
                if (c.route === route.name) {
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
        store.set(CacheEnum.MENU_IS_CLOSE, this.close.value)  // 将状态存储到本地
    }
    // 左侧主菜单的切换控制，父级菜单一个展示一个折叠
    toggleParentMenu(menu: IMenu) {
        this.menus.value.forEach(m => {
            m.isClick = false
            if (m === menu) m.isClick = true
        })
    }
}

export default new Menu()