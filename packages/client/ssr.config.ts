import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  build: {
    outDir: 'ssr-dist',
    ssr: true,
    lib: {
      entry: path.resolve(__dirname, 'ssr.tsx'),
      name: 'Client',
      formats: ['cjs'],
    },
    rollupOptions: {
      output: {
        dir: 'ssr-dist',
      },
    },
  },
  ssr: {
    format: 'cjs',
  },
  resolve: {
    alias: {
      '@/': '/src/',
      '@components': '/src/components',
      '@pages': '/src/pages',
    },
  },
})
