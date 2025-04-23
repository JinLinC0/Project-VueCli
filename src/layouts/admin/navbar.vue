<template>
    <div class="bg-white p-3 px-5 flex justify-between items-center">
        <!-- 左侧导航栏面包屑 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">编辑器</el-breadcrumb-item>
            <el-breadcrumb-item>富文本编辑器</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 右侧导航栏面包屑 -->
        <div class="flex justify-center items-center relative group cursor-pointer">
            <img :src="userStore.info?.avatar" class="w-8 h-8 rounded-full object-cover">
            <span class="ml-2 text-sm text-gray-600">{{ userStore.info?.name }}</span>
            <section class="group-hover:block absolute top-full bg-white shadow-sm p-3 whitespace-nowrap border rounded-md hidden">
                <div class="flex items-center cursor-pointer border-b py-3">
                    <a>*</a>
                    <span class="text-xs text-gray-600 ml-2">网站首页</span>
                </div>
                <div class="flex items-center cursor-pointer py-2">
                    <a>*</a>
                    <span class="text-xs text-gray-600 ml-2">在线文档</span>
                </div>
                <div class="flex items-center cursor-pointer py-2">
                    <a>*</a>
                    <span class="text-xs text-gray-600 ml-2">退出登录</span>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import user from '@/store/user';

// 从全局状态中读取用户数据，在标签中可以直接使用全局状态中的数据
const userStore = user();  // 全局状态相当于响应式的数据
</script>

<style scoped></style>