<script setup lang="ts">
import { useAuthStore } from '@/store'
import { useRouter } from 'uni-mini-router'

const router = useRouter()
const authStore = useAuthStore()
const simulationLogin = () => {
  authStore.setToken(new Date().getTime() + '')
}
</script>

<template>
  <view>
    <view>token: {{ authStore.token }}</view>
    <button style="margin-top: 20px" @click="simulationLogin">设置token</button>
    <button style="margin-top: 20px" @click="router.pushTab({ name: 'home' })">
      转到首页
    </button>
  </view>
</template>

<style scoped lang="scss"></style>
