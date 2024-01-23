import { createSSRApp } from 'vue'
import App from './App.vue'
import pinia from './store'
import router from './router'
import uviewPlus from 'uview-plus'
import './permission'
import './style/font.scss'
import 'virtual:windi.css' // windicss

export function createApp() {
  const app = createSSRApp(App)
  app.use(pinia)
  app.use(router)
  app.use(uviewPlus)
  return {
    app
  }
}
