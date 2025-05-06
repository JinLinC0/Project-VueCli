import vue from '@vitejs/plugin-vue'
import { Plugin } from 'vite'
import { setupMockPlugin } from './mock'

export function setupPlugins(isBuild: boolean, _env: ViteEnv) {
    // 返回原先就存在的vue()插件
    const plugins: Plugin[] = [vue()]
    // 添加mockjs的配置
    plugins.push(setupMockPlugin(isBuild))
    return plugins
}