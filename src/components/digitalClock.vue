<template>
    <div class="clock">
        <span class="text-[16px]">{{ date }} {{ time }}</span>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const time = ref<string>('');
const date = ref<string>('');

// 更新当前时间和日期
const updateDateTime = () => {
    const now = new Date();
    time.value = now.toLocaleTimeString(); // 格式为hh:mm:ss
    date.value = `${now.getFullYear()}年${String(now.getMonth() + 1).padStart(2, '0')}月${String(now.getDate()).padStart(2, '0')}日`; // 格式为yyyy年mm月dd日
};

// 组件挂载后启动定时器
onMounted(() => {
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000); // 每秒更新一次时间和日期
    // 清理定时器，防止内存泄漏
    onUnmounted(() => {
        clearInterval(interval);
    });
});
</script>

<style lang="scss" scoped>
.clock {
    height: auto;
    width: 250px;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    padding-left: 20px;
    justify-content: center;
    font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
    /* font-family: 'Arial', sans-serif; */
    /* background-color: #021026ff; */
    color: rgb(34, 30, 30);
}
</style>