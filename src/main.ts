import { createSSRApp } from 'vue'
import App from './App.vue'
import pinia from './store'
import './style/font.scss'
export function createApp() {
  const app = createSSRApp(App)
  app.use(pinia)
  return {
    app,
  }
}