import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const token = ref<string>()
    const setToken = (_token: string) => {
      token.value = _token
    }
    const clearToken = () => {
      token.value = void 0
    }
    const hasToken = () => !!token.value

    return {
      token,
      setToken,
      clearToken,
      hasToken
    }
  },
  {
    // 配置持久化
    persist: {
      // 调整为兼容多端的API
      storage: {
        setItem(key, value) {
          uni.setStorageSync(key, value)
        },
        getItem(key) {
          return uni.getStorageSync(key)
        }
      }
    }
  }
)
