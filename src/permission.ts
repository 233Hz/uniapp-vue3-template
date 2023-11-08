import router from './router'
import { useAuthStore } from './store'
import { useUserStore } from './store'

router.beforeEach((to, from, next) => {
  console.log('beforeEach', to, from)
  const authStore = useAuthStore()
  const userStore = useUserStore()
  if (to && to.name !== 'login' && !authStore.hasToken()) {
    next({
      name: 'login',
      params: { redirect: to.name!, ...to.query },
      navType: 'replaceAll'
    })
  } else if (to && to.name === 'login' && authStore.hasToken()) {
    next({ name: 'home', navType: 'replaceAll' })
  }
  // @ts-ignore
  else if (to && to.meta.ignoreAuth) {
    next()
  } else if (
    to &&
    //@ts-ignore
    to.meta?.roles &&
    //@ts-ignore
    to.meta.roles.length &&
    //@ts-ignore
    !to.meta.roles.some((item) => userStore.hasRole(item))
  ) {
    next({ name: '404' })
  } else {
    next()
  }
})

router.afterEach((to) => {
  console.log('afterEach', to)

  const authStore = useAuthStore()
  const userStore = useUserStore()

  if (to && to.name !== 'login' && !authStore.hasToken()) {
    router.push({ name: 'login', params: { redirect: to.name!, ...to.query } })
  } else if (to && to.name === 'login' && authStore.hasToken()) {
    router.replaceAll({ name: 'home' })
  }
  // @ts-ignore
  else if (to && to.meta.ignoreAuth) {
    return
  } else if (
    to &&
    //@ts-ignore
    to.meta?.roles &&
    //@ts-ignore
    to.meta.roles.length &&
    //@ts-ignore
    !to.meta.roles.some((item) => userStore.hasRole(item))
  ) {
    router.push({ name: '404' })
  }
})
