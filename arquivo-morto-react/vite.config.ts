import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Permite acessar via IP local
    port: 5173, // Porta que você deseja usar
    cors: true,
  },
  build: {
    outDir: 'dist', // Diretório de saída da build
  },
})
