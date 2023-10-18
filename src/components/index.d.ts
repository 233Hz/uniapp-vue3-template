import GlTest from './GlTest.vue'

declare module 'vue' {
  export interface GlobalComponents {
    GlTest: typeof GlTest
  }
}
