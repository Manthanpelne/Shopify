import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy:"https://glittery-pastelito-6d7bd8.netlify.app"
  },
  plugins: [react()],
})
