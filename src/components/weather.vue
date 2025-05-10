<template>
    <div class="container">
        <div class="w-full h-full flex">
            <img class="w-[20%] h-full ml-6 mr-6" :src="prop.url" />
            <div class="flex">
                <div class="text-[16px] text-black">
                    {{ prop.title }}
                </div>
                <div class="text-[16px] text-black text-center">
                    {{ data }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';

const data = ref('')
const prop = defineProps({
    url: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: '标题'
    }
})
onMounted(() => {
    axios.get('https://devapi.qweather.com/v7/weather/now?key=4a9a4ca2cc6648c8a8fa86c67991920c&location=101210101', {}).then((res: any) => {
        data.value = res.data.now.text
    })
})
</script>

<style lang="scss" scoped>
.container {
    width: 250px;
    height: 60%;
    margin-left: 22px;
    display: flex;
    flex-direction: row;
}
</style>