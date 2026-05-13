import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Para GitHub Pages: o base é configurado via variável de ambiente VITE_BASE_URL
// no workflow do GitHub Actions (.github/workflows/deploy.yml)
// Para domínio personalizado (ex: arquivovivo.com.br), use base: '/'
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: process.env.VITE_BASE_URL || '/',
  server: {
    allowedHosts: true,
  },
})
