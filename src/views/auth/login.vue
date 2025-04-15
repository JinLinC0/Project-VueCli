<template>
    <div class="bg-slate-400 h-screen flex justify-center md:items-center p-5">
        <div class="w-[720px] bg-slate-100 md:-translate-y-16 md:grid grid-cols-2 rounded-md shadow-2xl overflow-hidden">
            <div class="hidden md:block">
                <img src="/images/login.jpg" class="h-80 w-full object-cover" />
            </div>
            <div class="p-6">
                <h2 class="text-center text-gray-600 text-lg">用户登录</h2>
                <div class="mt-5">
                    <input type="text" placeholder="请输入用户名" class="login-input" />
                    <input type="text" placeholder="请输入密码" class="login-input mt-5" />
                </div>
                <button class="login-button mt-8">登录</button>
                <div class="flex gap-2 justify-center mt-5">
                    <a href class="text-xs text-gray-700 hover:text-blue-300">找回密码</a>
                    <a href class="text-xs text-gray-700 hover:text-blue-300">配套笔记</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.login-input {
    @apply w-full border border-gray-300 rounded-md p-2 mt-4 outline-none
    placeholder:text-xs focus:border-blue-500 duration-300
}
.login-button {
    @apply bg-blue-500 text-white w-full rounded-md py-2 hover:bg-blue-600 duration-300
}
</style>