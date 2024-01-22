import { defineStore } from 'pinia'
import { ref } from 'vue'
import pinia from '../index'

export interface UserState {
  token: string
  username: string
  roles: string[]
  menus: string[]
}

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref<string>()
    const username = ref<string>()
    const roles = ref<string[]>()
    const menus = ref<string[]>()
    const setToken = (val: string) => {
      token.value = val
    }
    const hasToken = () => {
      return !!token.value
    }
    const setUserInfo = (userInfo: Partial<Omit<UserState, 'token'>>) => {
      username.value = userInfo.username
      roles.value = userInfo.roles
      menus.value = userInfo.menus
    }
    const clear = () => {
      token.value = void 0
      username.value = void 0
      roles.value = []
      menus.value = []
    }
    return {
      token,
      username,
      roles,
      menus,
      setToken,
      hasToken,
      setUserInfo,
      clear
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

export const useUserStoreHook = () => useUserStore(pinia)
