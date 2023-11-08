<script setup lang="ts">
import { useAuthStore } from '@/store'
import { useUserStore } from '@/store'
import { useRouter } from 'uni-mini-router'

const router = useRouter()
const userStore = useUserStore()
const authStore = useAuthStore()
const simulationLogin = () => {
  authStore.clearToken()
}
</script>

<template>
  <view>
    <view>token{{ authStore.token }}</view>
    <view>用户名：{{ userStore.userInfo?.username }}</view>
    <view>角色：{{ userStore.userInfo?.roles }}</view>
    <button style="margin-top: 20px" @click="simulationLogin">移除token</button>
    <button
      style="margin-top: 20px"
      @click="
        userStore.setUserInfo({ username: '张三', roles: ['admin', 'user'] })
      "
    >
      设置管理员权限
    </button>
    <button
      style="margin-top: 20px"
      @click="userStore.setUserInfo({ username: '张三', roles: ['user'] })"
    >
      移除管理员角色
    </button>
    <button
      style="margin-top: 20px"
      @click="() => router.push({ name: 'test' })"
    >
      跳转到测试页
    </button>
  </view>
</template>

<style scoped lang="scss"></style>
