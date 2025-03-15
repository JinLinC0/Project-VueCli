import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import alias from './vite/alias'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias,
  }
})