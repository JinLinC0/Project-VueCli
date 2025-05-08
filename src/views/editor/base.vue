<template>
    <div>
        <wangEditor v-model="content" :height="300" />
        {{ content }}
    </div>
</template>

<script setup lang="ts">
import wangEditor from '@/components/wangEditor/editor.vue';
import { ref } from 'vue';

const content = ref('Hello world');
</script>

<style scoped></style>