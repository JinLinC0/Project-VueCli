import path from 'path'
import { AliasOptions } from 'vite'

const alias = {  
    // 配置路径别名，用@代表src文件夹
    '@': path.resolve('src')     // 不能和之前一样写成'@': path.resolve(__dirname, '../src')，否则会报错
} as AliasOptions

export default alias