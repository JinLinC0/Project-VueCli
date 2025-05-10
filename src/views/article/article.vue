<template>
    <div class="article">
        <AnimateList tag="ul" :duration="1" :delay="0.2">
            <li :data-index="index" v-for="(item, index) of acticles" :key="item.id" @click="del(index)">
                {{ item.title }}
            </li>
        </AnimateList>
    </div>
</template>

<script setup lang="ts">
import { getArticle } from '@/api/articleApi';
import { ref } from 'vue';
import AnimateList from '@/components/animateList.vue';

const acticles = ref();
getArticle().then(({ data }) => acticles.value = data);

// 删除文章
const del = (index: number) => {
    acticles.value.splice(index, 1);
};
</script>

<style lang="scss" scoped>
.article {
    padding: 20px;
    position: relative;
    background-color: aliceblue;
    width: 100%;
    height: 100%;

    ul {
        li {
            padding: 10px;
            margin-bottom: 20px;
            background-color: dimgrey;
            color: white;
            border-radius: 15px;
        }
    }
}
</style>