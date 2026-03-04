import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Mundo-Online-World/' || '/',
  plugins: [react()],
})
