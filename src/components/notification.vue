<template>
    <!--站内消息通知组件-->
    <div class="notification">
        <el-icon @click.stop="show = !show"><MuteNotification /></el-icon>  <!--@click.stop表示阻止冒泡，点击元素也相当于点击页面-->
        <el-tabs v-model="activeName" class="lists" v-show="show" @click.stop>
            <el-tab-pane label="系统通知" name="site">
                <a>dsafhjkasdhgasdhjknbgr手动阀山豆根发射点的撒法国德国</a>
                <a>dsafhjkasdhgasdhjknbgr手动阀山豆根发射点的撒法国德国</a>
                <a>dsafhjkasdhgasdhjknbgr手动阀山豆根发射点的撒法国德国</a>
            </el-tab-pane>
            <el-tab-pane label="站内消息" name="message">message</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue';

const activeName = ref('site')
// el-tabs的显示状态
const show = ref(false)
// 点击页面其他部分使el-tabs消失
nextTick(() => {
    document.documentElement.addEventListener('click', () => {
        show.value = false
    })
})
</script>

<style lang="scss" scoped>
.notification {
    @apply relative flex justify-center;
    .lists {
        @apply absolute bg-white px-3 py-2 border rounded-md shadow-md top-[25px] right-[-80px] z-10 w-[250px] text-sm;
        a {
            @apply truncate overflow-hidden block border-b pb-2 my-1 hover:text-fuchsia-950
        }
    }
}
</style>