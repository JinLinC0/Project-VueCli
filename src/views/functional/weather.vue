<template>
    <div class="flex items-center justify-center mt-10 ">
      <div class="flex items-center justify-center border-2 rounded-lg w-[380px] h-[50px] bg-gray-200">
        <Weather :url=weatherSvg title="杭州天气：" />
      </div>
    </div>
</template>

<script setup>
import Weather from '@/components/weather.vue';
import weatherSvg from '@/assets/weather.svg';

</script>

<style lang="scss" scoped>

</style>