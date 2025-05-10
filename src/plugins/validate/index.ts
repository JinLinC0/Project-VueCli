import * as veeValidate from 'vee-validate';
import { all } from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';
import zh_CN from '@vee-validate/i18n/dist/locale/zh_CN.json';
import yup from './yup'

// veeValidate的配置的全局定义
veeValidate.configure({
    // 语言的配置
    generateMessage: localize('zh_CN', zh_CN),
    // // 触发配置：在输入框发生变化时触发验证（默认是在焦点切换后进行验证）
    // validateOnInput: true,
})

// 批量定义规则
Object.entries(all).forEach(([name, rule]) => {
    // 批量注册验证规则
    veeValidate.defineRule(name, rule)
})

export default { yup, ...veeValidate }