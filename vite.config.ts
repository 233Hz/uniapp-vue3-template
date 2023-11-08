import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import uni from '@dcloudio/vite-plugin-uni'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    base: env.VITE_APP_BASE,
    plugins: [uni()],
    resolve: {
      // 配置别名
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    esbuild: {
      // 生产环境去除打印与debugger
      // drop: ['console', 'debugger'],
    },
    server: {
      host: '0.0.0.0',
      port: 9494,
      proxy: {
        '/mock': {
          target: '/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/mock/, '')
        }
      }
    }
  }
})
