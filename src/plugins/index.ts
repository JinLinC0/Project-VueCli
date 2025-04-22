import { App, defineAsyncComponent } from "vue";
import { setupTailwindcss } from "./tailwindcss";
import _ from 'lodash'
import setupElementPlus from "./elementPlus";
import setupPinia from "./pinia";

/***
 * @description 设置插件的方法
 * @param app 接收App应用实例
 */
export function setupPlugins(app: App) {
    setupTailwindcss()
    autoRegisterComponent(app)
    setupElementPlus(app)
    setupPinia(app)
}

// 自动注册全局组件
function autoRegisterComponent(app: App) {
    // 加载components文件夹下的所有组件
    const components = import.meta.glob('../components/**/*.vue')
    // 遍历components文件夹，提取组件的文件名，建议组件文件名也使用驼峰命名，如loginButton.vue
    Object.keys(components).forEach((key) => {
        const componentName = key.split('/').pop()?.split('.').shift() as string
        // 注册组件   _.camelCase(componentName) 将文件名转换为驼峰命名，组件调用时使用驼峰命名的方式进行调用
        app.component(_.camelCase(componentName), defineAsyncComponent(components[key] as () => Promise<{ default: typeof import('vue') }>))
    })
}