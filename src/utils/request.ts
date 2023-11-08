const baseUrl = import.meta.env.VITE_BASE_API
import { useUserStore } from '@/store'

// 添加拦截器
const httpInterceptor = {
  // 拦截前触发
  invoke(options: UniApp.RequestOptions) {
    // 非 http 开头拼接地址
    if (!options.url?.startsWith('http')) {
      options.url = baseUrl + options.url
    }
    // 请求超时，默认60s
    options.timeout = 1000 * 60
    // 添加小程序端请求表头
    options.header = {
      ...options.header,
      'source-client': 'miniapp'
    }
    const userStore = useUserStore()
    const token = userStore.token
    if (userStore.hasToken()) {
      options.header.Authorization = token
    }
  }
}
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

interface RequestResult<T> {
  code: number
  data: T
  msg: string
}

export const request = <T>(
  options: UniApp.RequestOptions
): Promise<RequestResult<T>> => {
  return new Promise((resolve, reject) => {
    uni.request({
      ...options,
      // 请求成功
      success(res) {
        const status = res.statusCode
        if (status >= 200 && status < 300) {
          resolve(res.data as RequestResult<T>)
        } else if (status === 401) {
          const userStore = useUserStore()
          userStore.clearToken()
          uni.navigateTo({
            url: '/pages/login/login',
            reLaunch: true
          })
          reject(res)
        } else {
          uni.showToast({
            title: (res.data as RequestResult<T>).msg || '请求失败',
            icon: 'none'
          })
          reject(res)
        }
        console.log(res)
      },
      // 请求失败
      fail(err) {
        uni.showToast({
          title: '网络错误，请稍后重试',
          icon: 'none'
        })
        reject(err)
      }
    })
  })
}
