<template>
    <div class>
        <div id="toast-editor"></div>
    </div>
</template>

<script setup lang="ts">
import { nextTick } from 'vue';
import toastEditor from './toastEditor';

interface IProps {
    modelValue?: string;
    height?: number;
    placeholder?: string;
}

// 可选参数，定义默认值
const props = withDefaults(defineProps<IProps>(), {
    modelValue: '111',
    height: 500,
    placeholder: '请输入内容'
});

const emit = defineEmits(['update:modelValue']);

// 等DOM渲染之后，再进行组件的渲染
nextTick(() => {
    const toastUi = new toastEditor('#toast-editor', `${props.modelValue}`, `${props.height}px`)
    toastUi.editor.on('change', (type: string) => {
        const content = type === 'markdown' ? toastUi.editor.getMarkdown() : toastUi.editor.getHTML()
        emit('update:modelValue', content)
    })
})
</script>

<style lang="scss" scoped>
#editor {
    @apply bg-white;

    .fullscreen {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 999;
        background: #fff;
    }
}
</style>