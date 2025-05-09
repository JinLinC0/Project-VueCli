<template>
    <div class="h-screen w-screen bg-gray-700 flex flex-col justify-center items-center">
        <img src="/images/vuecli.svg" class="w-40 h-40 object-cover rounded-full mb-8" />
        <div>
            <router-link :to="{ name: 'admin.home' }" class="my-button">后台管理</router-link>
            <router-link v-if="!utils.user.isLogin" :to="{ name: 'login' }" class="my-button ml-3 !bg-blue-700">用户登录</router-link>
        </div>
        <div class="text-gray-200 text-sm drop-shadow-md mt-3">前端脚手架项目</div>
    </div>
</template>

<script setup lang="ts">
import utils from '@/utils';
</script>
