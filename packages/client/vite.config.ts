import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import svgr from 'vite-plugin-svgr'
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT || 3001,
  },
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@/': '/src/',
      '@components': '/src/components',
      '@pages': '/src/pages',
    },
  },
})
