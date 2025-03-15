// 该文件抽离出一些别名的配置，后续修改别名相关的配置时，只需修改该文件即可
import path from 'path'
import { AliasOptions } from 'vite'

const alias = {  
    // 配置路径别名，用@代表src文件夹
    '@': path.resolve('src')     // 不能和之前一样写成'@': path.resolve(__dirname, '../src')，否则会报错
} as AliasOptions

export default alias