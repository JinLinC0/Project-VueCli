import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const router = defineStore("router", {
    state: () => {  // 里面定义了我们的数据 
        return {
            routes: getRoutes()  // 获取路由
        }
    }
})

// 编写一个方法来获取路由（读取我们所有可用的路由）
function getRoutes() {
    const router = useRouter();
    // 先要对读取的路由进行过滤，先读父级路由，过滤包含子路由的父级路由，并且元信息中的show为true
    const routes = router.getRoutes().filter(route => route.children.length && route.meta.show)
        .map(route => {
            // 再对子路由进行过滤，过滤掉meta中的show信息不为true的路由
            route.children = route.children.filter(route => route.meta?.show)
            return route
        })
        .filter(route => route.children.length);    // 当子菜单路由为空时，父级路由也过滤掉，不在菜单中显示
    return routes
}