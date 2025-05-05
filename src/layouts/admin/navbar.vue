<template>
    <div class="bg-white p-3 px-5 flex justify-between items-center">
        <div class="flex items-center">
            <!-- 折叠左侧菜单 -->
            <div @click="menuStore.toggleCollapse" class="flex items-center">
                <el-icon v-if="menuStore.close.value" class="mr-2 cursor-pointer">
                    <DArrowRight />
                </el-icon>
                <el-icon v-else class="mr-2 cursor-pointer">
                    <DArrowLeft />
                </el-icon>
            </div>
            <!-- 左侧导航栏面包屑 -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">编辑器</el-breadcrumb-item>
                <el-breadcrumb-item>富文本编辑器</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <!-- 右侧导航栏面包屑 -->
        <div class="flex justify-center items-center relative group cursor-pointer">
            <img :src="user.info?.avatar" class="w-8 h-8 rounded-full object-cover">
            <span class="ml-2 text-sm text-gray-600">{{ user.info?.name }}</span>
            <div class="ml-2 cursor-pointer flex justify-center" @click="fullscreen">
                <el-icon><FullScreen /></el-icon>
            </div>
            <section
                class="group-hover:block absolute top-full bg-white shadow-sm p-3 whitespace-nowrap border rounded-md hidden">
                <div class="flex items-center cursor-pointer border-b py-3">
                    <a>
                        <el-icon>
                            <HomeFilled />
                        </el-icon>
                    </a>
                    <span class="text-xs text-gray-600 ml-2">网站首页</span>
                </div>
                <div class="flex items-center cursor-pointer py-2">
                    <a>
                        <el-icon>
                            <Document />
                        </el-icon>
                    </a>
                    <span class="text-xs text-gray-600 ml-2">在线文档</span>
                </div>
                <div class="flex items-center cursor-pointer py-2">
                    <a>
                        <el-icon>
                            <DArrowRight />
                        </el-icon>
                    </a>
                    <span class="text-xs text-gray-600 ml-2" @click="utils.user.logout()">退出登录</span>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import userStore from '@/store/userStore';
import utils from '@/utils';
import menuStore from '@/composables/menu';

// 从全局状态中读取用户数据，在标签中可以直接使用全局状态中的数据
const user = userStore();  // 全局状态相当于响应式的数据

// 页面全屏方法
const fullscreen = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}
</script>

<style scoped></style>