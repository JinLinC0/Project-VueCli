<template>
    <router-view />
</template>

<script long="ts">
// 定义该页面是需要登录才能访问的
export default {
    route: { meta: { auth: true } }
}
</script>

<style lang="scss" scoped>

</style>