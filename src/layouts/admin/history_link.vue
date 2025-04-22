<template>
    <div class="hidden md:block bg-gray-50 p-3 border-t border-b shadow-sm">
        <div class="grid grid-flow-col gap-3 justify-start">
            <a v-for="link of links" class="text-sm bg-white border hover:bg-blue-300 hover:text-white duration-300 rounded-sm shadow-sm py-2 px-3 flex items-center justify-center cursor-pointer">
                {{ link.title }}
                <el-icon class="ml-1">
                    <Close />
                </el-icon>
            </a>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const links = ref<{ title: string }[]>([
    { title: '编辑器' },
    { title: '图表' },
    { title: '按钮' },
    { title: '文本块' },
    { title: '提示信息' },
    { title: '菜单' },
])
</script>

<style scoped></style>