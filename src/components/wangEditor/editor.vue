<template>
    <div class>
        <div style="border: 1px solid #ccc">
            <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
                :mode="mode" />
            <Editor style="height: 500px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig"
                :mode="mode" @onCreated="handleCreated" @onChange="handleChange" />
        </div>
    </div>
</template>

<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef } from 'vue'
import { ApiEnum } from '@/enum/apiEnum';
// @ts-ignore
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

interface Props {
    modelValue?: string
}
const props = withDefaults(defineProps<Props>(), {
    modelValue: '',  // 父组件传递进来的值
})

const emit = defineEmits(['update:modelValue'])

const editorRef = shallowRef()  // 编辑器实例，必须用 shallowRef
const mode = 'default'

// 内容 HTML
const valueHtml = ref(props.modelValue)

const toolbarConfig = {}

// 编辑器的配置项
const editorConfig = {
    placeholder: '请输入内容...',
    MENU_CONF: {
        uploadImage: {
            server: ApiEnum.UPLOAD_IMAGE_URL,  // 上传图片接口
        }
    }
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor: any) => {
    editorRef.value = editor
}

// 监听内容变化，将内容传递给父组件
const handleChange = () => {
    emit('update:modelValue', valueHtml.value)
}
</script>