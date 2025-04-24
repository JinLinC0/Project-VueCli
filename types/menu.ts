import * as ElIcons from '@element-plus/icons-vue';
// 定义菜单类型
interface Menu {
    title?: string   // 菜单名称
    icon?: keyof typeof ElIcons  // 菜单图标
    isClick?: boolean  // 是否被点击
    route?: string  // 跳转的路由地址
}

export interface IMenu extends Menu {
    children?: Menu[]
}