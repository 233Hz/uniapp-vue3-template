import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import uni from '@dcloudio/vite-plugin-uni'
import WindiCSS from 'vite-plugin-windicss'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    base: env.VITE_APP_BASE,
    plugins: [
      uni(),
      WindiCSS(),
      viteMockServe({
        enable: env.VITE_NODE_ENV === 'mock',
        ignore: (fileName) => !fileName.startsWith('ignore')
      })
    ],
    resolve: {
      // 配置别名
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    esbuild: {
      // 生产环境去除打印与debugger
      drop: ['prod', 'test'].includes(env.VITE_NODE_ENV)
        ? ['console', 'debugger']
        : []
    },
    transpileDependencies: ['@sadais/piui-tool', 'sadais-piui'],
    server: {
      host: '0.0.0.0',
      port: 9494,
      proxy: {
        '/api': {
          target: 'http://localhost:xxxx',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/mock/, '')
        }
      }
    }
  }
})
