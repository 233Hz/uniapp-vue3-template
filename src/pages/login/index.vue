<script setup lang="ts">
import { useUserStore } from '@/store'
import { useRouter } from 'uni-mini-router'

const router = useRouter()
const userStore = useUserStore()
const simulationLogin = () => {
  userStore.setToken(new Date().getTime() + '')
}
</script>

<template>
  <view>
    <view>token: {{ userStore.token }}</view>
    <button style="margin-top: 20px" @click="simulationLogin">设置token</button>
    <button style="margin-top: 20px" @click="router.pushTab({ name: 'home' })">
      转到首页
    </button>
  </view>
</template>

<style scoped lang="scss"></style>
