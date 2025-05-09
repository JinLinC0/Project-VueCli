import { CacheEnum } from "@/enum/cacheEnum";
import store from "./store";
import userApi, { ILoginData } from "@/api/userApi";
import router from "@/router";
import userStore from "@/store/userStore";

// 用户登录注册
export async function login(values: ILoginData) {
    const { data: { token } } = await userApi.login(values)
    // 使用我们自己写的本地存储工具，来存储token和为其设置过期时间
    store.set(CacheEnum.TOKEN_NAME, {
        // expire: 100,   // 100秒
        token,
    })
    // 获取用户资料
    userStore().getUserInfo()
    // 对于具体页面没有访问权限的登录，在我们进行登录后，回到的是具体的页面，而不是home首页
    // 即从哪个页面进入到登录页面，登录成功后，就回到哪个页面
    const routeName = store.get(CacheEnum.REDIRECT_ROUTE_NAME) ?? 'home'
    router.push({ name: routeName })  // 登录成功后，跳转到首页
}

// 判断用户是否登录
export function isLogin() {
    return Boolean(store.get(CacheEnum.TOKEN_NAME))
}

// 用户退出登录
export function logout() {
    // 删除本地的token
    store.remove(CacheEnum.TOKEN_NAME)
    // 退出之后，路由跳转到首页
    router.push('/');  
    // 将用户的全局状态删除
    userStore().info = null
}