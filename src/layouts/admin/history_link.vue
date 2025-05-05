<template>
    <!--方式一对应的读取方式-->
    <!-- <div class="hidden md:block bg-gray-50 p-3 border-t border-b shadow-sm" v-show="links.historyMenus.length">
        <div class="grid grid-flow-col gap-3 justify-start">
            <div v-for="link of links.historyMenus"
                class="text-sm text-gray-600 border hover:bg-violet-600 hover:text-white duration-300 rounded-md shadow-sm py-2 px-3 flex items-center justify-center cursor-pointer"
                :class="{ 'bg-white': $route.name !== link.route, 'bg-violet-600 text-white': $route.name === link.route}">
                <router-link :to="{ name: link.route }">
                    {{ link.title }}
                </router-link>
                <el-icon class="ml-1" @click="links.removeHistoryMenu(link)">
                    <Close />
                </el-icon>
            </div>
        </div>
    </div> -->
    <!--方式二对应的读取方式-->
    <div class="hidden md:block bg-gray-50 p-3 border-t border-b shadow-sm" v-show="menuStore.history.value.length">
        <div class="grid grid-flow-col gap-3 justify-start">
            <div v-for="menu of menuStore.history.value"
                class="text-sm text-gray-600 border hover:bg-violet-600 hover:text-white duration-300 rounded-md shadow-sm py-2 px-3 flex items-center justify-center cursor-pointer"
                :class="{ 'bg-white': $route.name !== menu.route, 'bg-violet-600 text-white': $route.name === menu.route}">
                <router-link :to="{ name: menu.route }">
                    {{ menu.title }}
                </router-link>
                <el-icon class="ml-1" @click="menuStore.removeHistoryMenu(menu)">
                    <Close />
                </el-icon>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// // 方式一：从Pinia全局状态中读取历史菜单内容
// import menuStore from '@/store/menuStore';
// const links = menuStore()
// 方式二：从全局的响应式对象中读取历史菜单内容
import menuStore from '@/composables/menu';
menuStore.init()
</script>

<style scoped></style>