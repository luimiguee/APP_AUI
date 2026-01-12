import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // Configuração para GitHub Pages
  // IMPORTANTE: Se o repositório se chama diferente de 'APP_AUI', 
  // altere '/APP_AUI/' para '/NOME_DO_SEU_REPO/'
  // Se o repositório for username.github.io, deixe base: '/'
  base: mode === 'production' ? '/APP_AUI/' : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Garante que os arquivos públicos sejam copiados corretamente
    copyPublicDir: true,
  },
}))
