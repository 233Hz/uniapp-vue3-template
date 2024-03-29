import { createSSRApp } from 'vue'
import App from './App.vue'
import pinia from './store'
import router from './router'
import './permission'
import './style/font.scss'
import 'virtual:windi.css' // windicss

export function createApp() {
  const app = createSSRApp(App)
  app.use(pinia)
  app.use(router)
  return {
    app
  }
}
