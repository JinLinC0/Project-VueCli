<template>
    <div class="flex items-center justify-center mt-10">
      <div class="flex items-center justify-center border-2 rounded-lg w-[380px] h-[50px] bg-gray-200">
        <span>当前北京时间：</span>
        <DigitalClock />
      </div>
    </div>
</template>

<script setup>
import DigitalClock from '@/components/digitalClock.vue';


</script>

<style lang="scss" scoped>

</style>