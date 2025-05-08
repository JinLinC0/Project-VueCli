<template>
    <div id="editor"></div>
</template>

<script setup lang="ts">
import { nextTick } from 'vue';
import wangEditor from './wangEditor';

interface Props {
    height?: number
    modelValue?: string
    uploadImgServer?: string  // 上传图片的服务器地址
}

const props = withDefaults(defineProps<Props>(), {
    height: 100,
    modelValue: '',  // 父组件传递进来的值
    uploadImgServer: '/api/upload/image'
})

const emit = defineEmits(['update:modelValue'])

nextTick(() => {
    new wangEditor("#editor", (newHtml: string)=> {  // 回调函数，表单更新，将新值传递给父组件
        emit('update:modelValue', newHtml)
    }, props)
})
</script>

<style lang="scss" scoped>

</style>