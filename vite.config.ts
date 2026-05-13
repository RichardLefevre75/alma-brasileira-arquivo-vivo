import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Para GitHub Pages: base = /<nome-do-repositório>/
// Para domínio personalizado (ex: arquivovivo.com.br): base = '/'
// A variável GITHUB_PAGES_BASE é definida no workflow do GitHub Actions
const base = process.env.GITHUB_PAGES_BASE ?? '/'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base,
  server: {
    allowedHosts: true,
  },
})
