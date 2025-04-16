import _ from "lodash"

const env: any = _.cloneDeep(import.meta.env)

Object.entries(import.meta.env as Record<string, any>).forEach(([key, value]) => {
    // 对布尔类型进行转换
    if (value === 'true' || value === 'false') {
        env[key] = value === 'true' ? true : false
    }
    // 对数字类型进行转换
    else if (/^\d+$/.test(value)) {
        env[key] = Number(value)
    }
    else if (value === 'null') env[key] = null
    else if (value === 'undefined') env[key] = undefined
})

export default env as ViteEnv