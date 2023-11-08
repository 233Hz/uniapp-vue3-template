<template>
  <view class="content">
    <text>uniapp-vue3-template</text>
    <Test />
    <GlTest />
    <view>
      <text>测试pinia</text>
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
