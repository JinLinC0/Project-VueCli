<template>
    <div class="grid md:grid-cols-4 gap-3">
        <el-card shadow="hover" :body-style="{ padding: '20px' }" v-for="(card, index) of cards" :key="index"
            class="cursor-pointer">
            <template #header>
                <div class="flex justify-between items-center">
                    <span>{{ card.title }}</span>
                    <el-tag type="danger" size="mini" effect="dark">月</el-tag>
                </div>
            </template>
            <section class="flex mt-3 justify-between items-center">
                <span class="text-3xl">${{ card.price }}</span>
                <div class="w-[30px] h-[30px]">
                    <component :is="card.icon" :class="card.iconColor" />
                </div>
            </section>
            <section class="text-base mt-6 flex justify-between">
                <span>{{ card.totalTitle }}</span>
                <span>{{ card.total }}</span>
            </section>
        </el-card>
    </div>

    <!-- echarts图表项 -->
    <div class="mt-5 grid md:grid-cols-2 gap-3">
        <el-card shadow="hover" :body-style="{ padding: '20px' }">
            <template #header>
                <span>用户统计</span>
            </template>
            <div id="echart1" class="h-72 w-full"></div>
        </el-card>
        <el-card shadow="hover" :body-style="{ padding: '20px' }">
            <template #header>
                <span>销售额</span>
            </template>
            <div id="echart2" class="h-72 w-full"></div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import * as ElIcons from '@element-plus/icons-vue';
import * as echarts from 'echarts';
import { echart1, echart2 } from './echart';

interface ICard {
    title: string,
    price: number,
    icon: keyof typeof ElIcons,
    iconColor: string,
    totalTitle: string,
    total: number
}

const cards = ref < ICard[] > ([
    { title: '用户数', price: 15, icon: "Avatar", iconColor: 'text-violet-500', totalTitle: '总人数', total: 200 },
    { title: '销售额', price: 154, icon: "Money", iconColor: 'text-blue-500', totalTitle: '总销售额', total: 600 },
    { title: '订单数', price: 124, icon: "ShoppingCart", iconColor: 'text-red-500', totalTitle: '总订单数', total: 500 },
    { title: '评论数', price: 24, icon: "ChatDotRound", iconColor: 'text-green-500', totalTitle: '总评论数', total: 300 },
])

// 图表项配置
nextTick(() => {
    echarts.init(document.getElementById('echart1')).setOption(echart1);
    echarts.init(document.getElementById('echart2')).setOption(echart2);
})
</script>

<style lang="scss" scoped></style>