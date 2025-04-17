<template>
    <div class="admin h-screen w-screen flex">
        <!-- 左侧菜单 -->
        <div class="menu w-[200px] bg-gray-800 p-4">
            <!-- 菜单顶部图标和描述 -->
            <div class="logo text-gray-300 flex items-center">
                <i class="fab fa-robot text-gray-300"></i>
                <span class="text-gray-300 text-base">前端脚手架项目</span>
            </div>
            <!-- 导航菜单 -->
            <div class="left-container">

            </div>
        </div>
        <!-- 右侧主要内容 -->
        <div class="content flex-1 bg-gray-200">
            <router-view />
        </div>
    </div>
</template>

<script long="ts">
// 定义该页面是需要登录才能访问的
export default {
    route: { meta: { auth: true } }
}
</script>

<style lang="scss" scoped></style>