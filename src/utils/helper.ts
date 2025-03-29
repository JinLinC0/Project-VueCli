import _ from "lodash"

class Helper {
    public env = {} as ImportMetaEnv
    constructor() {
        this.env = this.getEnvs()
    }

    public getEnvs(): ImportMetaEnv {
        // 深拷贝import.meta.env
        const envs: any = _.cloneDeep(import.meta.env)
        // 将import.meta.env的类型，转换为正确的类型
        Object.entries(import.meta.env as Record<string, any>).forEach(([key, value]) => {
            // 对布尔类型进行转换
            if (value === 'true' || value === 'false') {
                envs[key] = value === 'true' ? true : false
            }
            // 对数字类型进行转换
            else if (/^\d+$/.test(value)) {
                envs[key] = Number(value)
            }
            else if (value === 'null') envs[key] = null
            else if (value === 'undefined') envs[key] = undefined
        })
        return envs
    }
}

const helper = new Helper()
const { env } = helper

export default helper
export { env }