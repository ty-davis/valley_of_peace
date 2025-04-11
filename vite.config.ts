import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: ['localhost', 'vop.ty-davis.com'],
  },
  plugins: [vue()],
})
