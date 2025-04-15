import * as yup from 'yup';

// 给yup设置中文提示
yup.setLocale({
    // 通用类型
    mixed: {
        required: '${label}不能为空',
    },
    // 字符串类型
    string: {
        email: '邮箱格式错误',
        min: '最少${min}个字符',
        max: '最多${max}个字符',
        length: '必须为${length}个字符',
    },
    // 数字类型
    number: {
        min: '最小${min}',
        max: '最大${max}',
    }
})

export default yup;