// 自定义配置
interface ViteEnv {
    VITE_ROUTER_AUTOLOAD: boolean
    VITE_API_URL: string
}

// VITE官网配置，继承自定义的配置，将自定义的配置包含进来
interface importMetaEnv extends ViteEnv {}

interface importMeta {
    readonly env: importMetaEnv
}

