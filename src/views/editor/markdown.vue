<template>
    <Editor v-model="content" :height="500" placeholder="请输入MarkDown内容"/>
</template>

<script setup lang="ts">
import Editor from '@/components/markdown/editor.vue';
import { ref } from 'vue';

const content = ref('# Hello World')

</script>

<style scoped>

</style>