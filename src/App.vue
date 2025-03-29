<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import userApi from './api/userApi';
async function getUserInfo() {
  const response = await userApi.login();
  console.log(response.data.token);
}


onMounted(async() => {
  await getUserInfo()
})
</script>

<style scoped></style>
