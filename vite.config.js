// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: this must match path exactly, including capitals
export default defineConfig({
  base: '/Bank-Services/',
  plugins: [react()],
})
