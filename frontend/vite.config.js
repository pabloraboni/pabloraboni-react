import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',  // Esta é a configuração padrão
  },
  server: {
    port: 5173,
    host: true,
  },
})
