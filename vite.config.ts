import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Para GitHub Pages: substitua 'alma-brasileira' pelo nome do seu repositório
// Exemplo: se o repo for github.com/usuario/arquivo-vivo, use base: '/arquivo-vivo/'
// Para domínio personalizado (ex: arquivovivo.com.br), use base: '/'
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  server: {
    allowedHosts: true,
  },
})
