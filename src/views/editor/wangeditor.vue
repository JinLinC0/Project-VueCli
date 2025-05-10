<template>
    <div class>
        <wangEditor v-model="content" :height="300" />
        <div class="bg-gray-100 mt-3 border p-3">{{ content }}</div>
    </div>
</template>

<script setup lang="ts">
import wangEditor from '@/components/wangEditor/editor.vue';
import { ref } from 'vue';

const content = ref('Hello world');
</script>

<style scoped></style>