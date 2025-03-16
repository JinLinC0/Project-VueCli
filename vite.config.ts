import { ConfigEnv, defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import alias from './vite/alias'
import { parseEnv } from './vite/util'
import { setupPlugins } from './vite/plugins'

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
  const env = loadEnv(mode, root)
  // parseEnv(env)最后读取到配置文件的数据，修复了其值都是字符串类型
  parseEnv(env)
  return {
    // plugins: [vue()],
    plugins: setupPlugins(isBuild, env),
    resolve: {
      alias
    }
  }
}