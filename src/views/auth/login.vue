<template>
    <Form class="bg-slate-400 h-screen flex justify-center md:items-center p-5" @submit="onSubmit" :validation-schema="schema">
        <div class="w-[720px] bg-slate-100 md:-translate-y-16 md:grid grid-cols-2 rounded-md shadow-2xl overflow-hidden">
            <div class="hidden md:block relative">
                <img src="/images/login.jpg" class="absolute h-full w-full object-cover" />
            </div>
            <div class="p-6">
                <h2 class="text-center text-gray-600 text-lg">用户登录</h2>
                <div class="mt-5">
                    <Field name="account" placeholder="请输入用户名" class="my-input" />
                    <ErrorMessage name="account" as="div" class="my-error" />

                    <Field name="password" placeholder="请输入密码" type="password" class="my-input" />
                    <ErrorMessage name="password" as="div" class="my-error" />
                </div>
                <button class="login-button mt-8">登录</button>
                <div class="flex gap-2 justify-center mt-5">
                    <a class="text-xs text-gray-700 hover:text-blue-300">找回密码</a>
                    <a class="text-xs text-gray-700 hover:text-blue-300">配套笔记</a>
                </div>
            </div>
        </div>
    </Form>
</template>

<script setup lang="ts">
import userApi from '@/api/userApi'
import v from '@/plugins/validate'
import { store } from '@/utils'

// 提取出validate包中的几个组件，form表单，字段和错误消息
const { Form, Field, ErrorMessage } = v

// 通过yup进行统一的验证管理
const schema = v.yup.object({
    account: v.yup.string().required().label("账号").matches(/.+@.+|\d{11}/, "请输入正确的邮箱或手机号"),
    password: v.yup.string().required().min(3).label("密码")
})

// 表单提交
const onSubmit = async (values: any) => {
    const { data: { token } } = await userApi.login(values)
    // 将token存储到本地
    localStorage.setItem("token", token)
    // 使用我们自己写的本地存储工具，来存储token和为其设置过期时间
    store.set("token", {
        expire: 100, token
    })
}
</script>

<script lang="ts">
export default {
    route: { name: 'login' }
}
</script>

<style lang="scss" scoped>
.login-button {
    @apply bg-blue-500 text-white w-full rounded-md py-2 hover:bg-blue-600 duration-300
}
</style>