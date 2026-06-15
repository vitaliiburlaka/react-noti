import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  root: 'examples',
  plugins: [svgr(), react()],
  base: '/react-noti/',
  build: {
    outDir: 'build',
    emptyOutDir: true,
  },
})
