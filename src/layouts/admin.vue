<template>
    <div class="admin h-screen w-screen flex">
        <MenuComponet />
        <!-- 右侧主要内容 -->
        <div class="content flex-1 bg-gray-200">
            <NavbarComponet />
            <router-view />
        </div>
    </div>
</template>

<script setup lang="ts">
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