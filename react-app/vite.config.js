import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/test-gemini/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})