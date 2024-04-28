import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy:"https://shopify-eight-steel.vercel.app"
  },
  plugins: [react()],
})
