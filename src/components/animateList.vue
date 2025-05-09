<template>
    <div class="animate-list">
        <TransitionGroup appear :tag="props.tag" name="animate" @before-enter="beforeEnter" @enter="enter">
            <slot />
        </TransitionGroup>
    </div>
</template>

<script setup lang="ts">
import gsap from 'gsap';
import { RendererElement } from 'vue';

interface Props {
    tag?: string
    duration?: number  // 动画过渡时间
    delay?: number  // 动画延迟时间
}

const props = withDefaults(defineProps<Props>(), {
    tag: '',
    duration: 1,
    delay: 0.2,
})

// 使用gsap动画库进行动画效果的编程
// 定义开始进入的钩子函数  el为元素，done为回调函数
const beforeEnter = (el: RendererElement) => {
    // 设置元素的透明度为0（初始的时候）
    gsap.set(el, {
        opacity: 0,
    })
}
// 定义结束的钩子函数  el为元素，done为回调函数
const enter = (el: RendererElement) => {
    // 设置动画效果，透明度从0变为1，持续时间为1秒
    gsap.to(el, {
        opacity: 1,
        duration: props.duration, // 设置动画的持续时间为3秒
        delay: el.dataset.index * props.delay, // 设置动画的延迟时间为2秒
    })
}
</script>

<style lang="scss" scoped>
.animate-list {
    position: relative;

    .animate-leave-active {
        transition: all 1s ease; // 设置动画的过渡时间为1秒
        position: absolute; // 在删除的时候，设置为绝对定位
        width: 100%;
    }

    .animate-leave-to {
        opacity: 0; // 设置动画结束时元素的透明度为0
    }

    .animate-move {
        transition: all 1s ease; // 设置动画的过渡时间为1秒
    }
}
</style>