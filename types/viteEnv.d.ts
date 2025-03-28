// 自定义配置
interface ViteEnv {
    VITE_SOME_KEY: number
    VITE_ROUTE_AUTOLOAD: boolean
    VITE_API_URL: string
}

// VITE官网配置，继承自定义的配置，将自定义的配置包含进来
interface importMetaEnv extends ViteEnv {}

interface importMeta {
    readonly env: importMetaEnv
}

