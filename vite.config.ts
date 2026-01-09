import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Configuração para GitHub Pages
  // IMPORTANTE: Se o repositório se chama diferente de 'APP_AUI', 
  // altere '/APP_AUI/' para '/NOME_DO_SEU_REPO/'
  // Se o repositório for username.github.io, deixe base: '/'
  base: process.env.NODE_ENV === 'production' ? '/APP_AUI/' : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})

