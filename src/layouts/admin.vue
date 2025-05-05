<template>
    <div class="admin h-screen w-screen grid md:grid-cols-[auto_1fr]"> <!-- 表示布局分为两列，一个是自动，一个是占据剩余空间 -->
        <!-- 左侧菜单栏，菜单默认隐藏，在平板模式的情况下进行显示 -->
        <MenuComponet />
        <!-- 右侧主要内容 -->
        <div class="content bg-gray-100 grid grid-rows-[auto_1fr]"> <!-- 表示布局分为两行，一个是自动，一个是占据剩余空间 -->
            <div>
                <!-- 顶部导航栏 -->
                <NavbarComponet />
                <!-- 历史记录链接栏 -->
                <HistoryLinkComponet />
            </div>
            <div class="m-3 relative overflow-y-auto">
                <router-view #default="{ Component }">
                    <!-- 添加跳转的过渡动画 -->
                    <Transition appear class="animate__animated" 
                        enter-active-class="animate__fadeIn"
                        leave-active-class="animate__fadeOut">
                        <component :is="Component" class="absolute w-full" />
                    </Transition>
                </router-view>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// import menuStore from '@/store/menuStore';
import menu from '@/composables/menu';
import HistoryLinkComponet from './admin/history_link.vue';
import MenuComponet from './admin/menu.vue'
import NavbarComponet from './admin/navbar.vue'
import { useRoute } from 'vue-router';
import { watch } from 'vue';

const route = useRoute()

menu.init()  // 初始化菜单的内容
watch(route, () => {
    menu.addHistoryMenu(route)
}, { immediate: true })

</script>

<script lang="ts">
// 定义该页面是需要登录才能访问的
export default {
    route: { meta: { auth: true } }
}
</script>

<style lang="scss" scoped>
.animate__fadeIn {
    animation-duration: 0.5s;
}

.animate__fadeOut {
    animation-duration: 0.5s;
}
</style>