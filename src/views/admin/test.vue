<template>
    <Form @submit="onSubmit">
        <!-- <Field name="account" v-model="account" :rules="emailRule" :validate-on-input="true" />
        <ErrorMessage name="account" /> -->
        <Field name="account" label="账号" v-model="account" 
            :rules="{ email: true, required: true}" :validate-on-input="true"
            #default="{ field, errorMessage }">
            <input v-bind="field" v-model="account" />
            <hr />
            <p>{{ errorMessage }}</p>
        </Field>
        <hr />
        <button>提交表单</button>
    </Form>
</template>

<script setup lang="ts">
import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate';
import { required, email } from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';
import zh_CN from '@vee-validate/i18n/dist/locale/zh_CN.json';
import { ref } from 'vue';

const account = ref('');

// // 定义表单规则
// const emailRule = (value: any) => {
//     // 通过@符号，判断是否是邮箱
//     return /@/.test(value) ? true : '邮箱格式错误';
// }

// 声明系统提供的验证规则
defineRule('email', email);
defineRule('required', required);

configure({
    generateMessage: localize('zh_CN', zh_CN)
})

// 表单提交
const onSubmit = (values: any) => {
    // values是表单项数据
    console.log(values);
    alert('验证通过')
}

</script>

<style lang="scss">
div {
    @apply flex w-screen h-screen justify-center items-center;

    input {
        @apply border-2 p-2 rounded-md border-violet-950 outline-none;
    }
}
</style>