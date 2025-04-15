import * as veeValidate from 'vee-validate';
import { all } from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';
import zh_CN from '@vee-validate/i18n/dist/locale/zh_CN.json';
import yup from './yup'

// 中文语言配置
veeValidate.configure({
    generateMessage: localize('zh_CN', zh_CN)
})

// 批量定义规则
Object.entries(all).forEach(([name, rule]) => {
    // 批量注册验证规则
    veeValidate.defineRule(name, rule)
})

const modules = { yup, ...veeValidate }

export default modules