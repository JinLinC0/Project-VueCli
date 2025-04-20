<template>
    <div class="m-3 grid grid-flow-col gap-2 justify-start">
        <a v-for="link of links" class="bg-white rounded-s-md py-2 px-3 flex items-center justify-center">
            <span class="text-sm text-gray-600">{{ link.title }}</span>
            <el-icon class="ml-1"><Close /></el-icon>
        </a>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const links = ref<{ title: string }[]> ([
    {title: '编辑器'},
    {title: '图表'},
    {title: '按钮'},
    {title: '文本块'},
    {title: '提示信息'},
    {title: '菜单'},
])
</script>

<style scoped></style>