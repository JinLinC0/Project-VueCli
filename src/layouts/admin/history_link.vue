<template>
    <div class="hidden md:block bg-gray-50 p-3 border-t border-b shadow-sm" v-show="links.historyMenus.length">
        <div class="grid grid-flow-col gap-3 justify-start">
            <div v-for="link of links.historyMenus"
                class="text-sm bg-white border hover:bg-blue-300 hover:text-white duration-300 rounded-sm shadow-sm py-2 px-3 flex items-center justify-center cursor-pointer"
                :class="{ 'bg-blue-300 text-white': $route.name === link.route }">
                <router-link :to="{ name: link.route }">
                    {{ link.title }}
                </router-link>
                <el-icon class="ml-1" @click="links.removeHistoryMenu(link)">
                    <Close />
                </el-icon>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import menuStore from '@/store/menuStore';

// 从全局状态中读取历史菜单内容
const links = menuStore()
</script>

<style scoped></style>