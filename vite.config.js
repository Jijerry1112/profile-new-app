import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/profile-new-app/',
  plugins: [react()],
  build: {
    outDir: '/docs'
  }
})
