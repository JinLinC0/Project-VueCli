import { App } from "vue";
import { setupTailwindcss } from "./tailwindcss";

/***
 * @description 设置插件的方法
 * @param app 接收App应用实例
 */
export function setupPlugins(app: App) {
    setupTailwindcss()
}