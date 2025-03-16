import _ from 'lodash'

export function parseEnv(env: Record<string, any>) {
    // Record<string, any>输入的类型是字符串，返回的类型是any类型，原始什么类型就返回什么类型
    // 使用lodash包进行深拷贝
    const envs = _.cloneDeep(env)
    // 对得到的env进行遍历，将env中的每一项都进行转换
    Object.entries(env).forEach(([key, value]) => {
        // 对布尔类型进行转换
        if (value === 'true' || value === 'false') {
            envs[key] = value === 'true' ? true : false
        }
        // 对数字类型进行转换
        if (/^\d+$/.test(value)) {
            envs[key] = parseInt(value)
        }
    })
    return envs
}