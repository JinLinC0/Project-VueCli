export enum CacheEnum {
    // 这里面的内容用于作为我们本地存储的key值，方便我们管理
    // 登录token
    TOKEN_NAME = 'login_token',
    // 当前页面的路由信息
    REDIRECT_ROUTE_NAME = 'redirect_route_name',
    // 历史菜单
    HISTORY_MENU = 'history_menu',
    // 左侧菜单的点击状态
    MENU_IS_CLOSE = 'menu_is_close'
}