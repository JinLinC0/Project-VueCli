<template>
    <div class>
        <markEditor v-model="content" :height="500" placeholder="请输入MarkDown内容"/>
        <div class="bg-gray-100 mt-3 border p-3">{{ content }}</div>
    </div>
</template>

<script setup lang="ts">
import markEditor from '@/components/markdown/markEditor.vue';
import { ref } from 'vue';

const content = ref('# Hello World')

</script>

<style scoped>

</style>