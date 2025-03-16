import { viteMockServe } from 'vite-plugin-mock'

export function setupMockPlugin(isBuild: boolean) {
    return viteMockServe({
        mockPath: 'mock',   // 存放mock接口的文件夹
        localEnabled: !isBuild   // 在开关环境的时候启动mock
    })
}