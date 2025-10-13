import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path' // 导入 path 模块中的 resolve
import { fileURLToPath } from 'url'; // 导入 url 模块

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..'); // 使用 resolve 来确保兼容性，并获取目录

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      // 配置别名，将 "@" 指向项目的 "src" 目录
      '@': resolve(__dirname, 'src'),
    }
  }
})
