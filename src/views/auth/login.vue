<template>
    <div class="bg-slate-400 h-screen flex justify-center items-center">
        <div class="w-[720px] bg-slate-100 -translate-y-16 grid grid-cols-2 rounded-md shadow-2xl overflow-hidden">
            <div>
                <img src="/images/login.jpg" class="h-96 w-full object-cover" />
            </div>
            <div class="p-6">
                <h2 class="text-center text-gray-600 text-lg">用户登录</h2>
                <div>
                    <input 
                        type="text" 
                        class="w-full border border-gray-300 rounded-md p-2 mt-4" 
                        placeholder="请输入用户名"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>