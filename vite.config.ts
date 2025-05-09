import { ConfigEnv, loadEnv } from 'vite'
import alias from './vite/alias'
import { parseEnv } from './vite/util'
import { setupPlugins } from './vite/plugins'
import { visualizer } from 'rollup-plugin-visualizer'

/***
 * @description 相关插件的配置
 * @param command 当前是在编译环境还是生产环境
 * @param mode 运行模式，开发阶段是development，生产阶段是production
 */
export default ({ command, mode }: ConfigEnv) => {
  // isBuild定义当前是否在编译模式
  const isBuild = command === 'build'
  // 获取配置文件的目录
  const root = process.cwd()
  // 提取配置文件中的环境变量，获取.env文件中的所有配置项，但是配置项的具体值是字符串类型
  const env = parseEnv(loadEnv(mode, root))  // parseEnv(env)最后读取到配置文件的数据，修复了其值都是字符串类型
  return {
    // 设置scss的api类型为modern-compiler
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    },
    // plugins: [vue()],
    plugins: [...setupPlugins(isBuild, env), visualizer()],
    resolve: {
      alias
    },
    build: {  // 依赖模块单独打包
      rollupOptions: {
        emptyOutDir: true,  // 每次打包将编译目录进行清空
        output: {
          manualChunks(id: string) {
            // 如果id中包含node_modules，则返回node_modules中的模块名（格式化的内容）
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          }
        }
      }
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_URL,   // 如果mock开启，则代理到mock，否则代理到配置文件中的真实后端的api地址
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, '')
        }
      }
    }
  }
}