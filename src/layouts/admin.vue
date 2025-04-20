<template>
    <div class="admin h-screen w-screen flex">
        <!-- 左侧菜单栏 -->
        <MenuComponet />
        <!-- 右侧主要内容 -->
        <div class="content flex-1 bg-gray-200">
            <!-- 顶部导航栏 -->
            <NavbarComponet />
            <!-- 历史记录链接栏 -->
            <HistoryLinkComponet />
            <router-view />
        </div>
    </div>
</template>

<script setup lang="ts">
import HistoryLinkComponet from './admin/history_link.vue';
import MenuComponet from './admin/menu.vue'
import NavbarComponet from './admin/navbar.vue'
</script>

<script lang="ts">
// 定义该页面是需要登录才能访问的
export default {
    route: { meta: { auth: true } }
}
</script>

<style lang="scss"></style>