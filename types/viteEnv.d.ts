// VITE官网配置，继承自定义的配置，将自定义的配置包含进来
interface importMetaEnv {
    // 自定义配置
    VITE_ROUTER_AUTOLOAD: boolean
    VITE_API_URL: string
    VITE_MOCK_ENABLE: boolean  // 是否开启mock
}

interface importMeta {
    readonly env: importMetaEnv
}

