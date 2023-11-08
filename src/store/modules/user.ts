import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface UserInfo {
  username: string
  roles: string[]
}

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<UserInfo>()
    const setUserInfo = (_userInfo: UserInfo) => {
      userInfo.value = _userInfo
    }
    const clearUserInfo = () => {
      userInfo.value = void 0
    }
    const hasRole = (role: string) => {
      return userInfo.value && userInfo.value.roles.includes(role)
    }
    return {
      userInfo,
      setUserInfo,
      clearUserInfo,
      hasRole
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
