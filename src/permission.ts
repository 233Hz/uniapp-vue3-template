import router from './router'
import { useUserStoreHook } from './store'

router.beforeEach((to, from, next) => {
  console.log('beforeEach', to, from)
  const userStore = useUserStoreHook()
  if (to && to.name !== 'login' && !userStore.hasToken()) {
    next({
      name: 'login',
      params: { redirect: to.name!, ...to.query },
      navType: 'replaceAll'
    })
  } else if (to && to.name === 'login' && userStore.hasToken()) {
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
    !to.meta.roles.some((item) => userStore.roles?.includes(item))
  ) {
    next({ name: '404' })
  } else {
    next()
  }
})

router.afterEach((to) => {
  console.log('afterEach', to)

  const userStore = useUserStoreHook()

  if (to && to.name !== 'login' && !userStore.hasToken()) {
    router.push({ name: 'login', params: { redirect: to.name!, ...to.query } })
  } else if (to && to.name === 'login' && userStore.hasToken()) {
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
    !to.meta.roles.some((item) => userStore.roles?.includes(item))
  ) {
    router.push({ name: '404' })
  }
})
