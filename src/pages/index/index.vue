<template>
  <view class="content">
    <text>uniapp-vue3-template</text>
    <Test />
    <GlTest />
    <view>
      <text>测试pinia</text>
      <text style="margin-left: 20rpx">TOKEN:{{ userStore.token }}</text>
      <button @click="() => userStore.setToken(randomToken())">
        切换TOKEN
      </button>
    </view>
    <text
      >测试字体图标
      <text style="margin-left: 20rpx; color: pink" class="icon-sousuo"
    /></text>
    <text class="test-scss">测试scss</text>
  </view>
</template>

<script setup lang="ts">
import Test from './components/Test.vue'
import { useUserStore } from '@/store'

const userStore = useUserStore()

const randomToken = () => Math.floor(Math.random() * 100000000000).toString()
</script>

<style lang="scss">
$test-size: 40rpx;
$text-color: red;

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .test-scss {
    font-size: $test-size;
    color: $text-color;
  }
}
</style>
