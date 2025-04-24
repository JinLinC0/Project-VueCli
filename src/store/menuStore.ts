import { defineStore } from "pinia";
import router from "@/router";
import { IMenu } from "#/menu";

export default defineStore("menu", {
    state: () => {  // 里面定义了我们的数据 
        return {
            menus: [] as IMenu[],  // 获取菜单路由
        }
    },
    actions: {
        // 执行init方法初始化菜单
        init() {
            this.getMenusByRoute()
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
        }
    },
})