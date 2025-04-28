<template>
    <div class="admin min-h-screen w-screen flex">
        <!-- 左侧菜单栏，菜单默认隐藏，在平板模式的情况下进行显示 -->
        <MenuComponet class="hidden md:block" />
        <!-- 右侧主要内容 -->
        <div class="content flex-1 bg-gray-100">
            <!-- 顶部导航栏 -->
            <NavbarComponet />
            <!-- 历史记录链接栏 -->
            <HistoryLinkComponet />
            <div class="m-5">
                <router-view #default="{ Component }">
                    <!-- 添加跳转的过渡动画 -->
                    <Transition enter-active-class="animate__animated animate__fadeIn" >
                        <component :is="Component" />
                    </Transition>
                </router-view>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import menuStore from '@/store/menuStore';
import HistoryLinkComponet from './admin/history_link.vue';
import MenuComponet from './admin/menu.vue'
import NavbarComponet from './admin/navbar.vue'

const menu = menuStore()
menu.init()  // 初始化菜单的内容

</script>

<script lang="ts">
// 定义该页面是需要登录才能访问的
export default {
    route: { meta: { auth: true } }
}
</script>

<style lang="scss"></style>