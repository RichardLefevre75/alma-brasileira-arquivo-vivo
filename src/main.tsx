import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

function mount() {
  const rootEl = document.getElementById('root')
  if (!rootEl) {
    console.error('[Arquivo Vivo] #root element not found')
    return
  }
  createRoot(rootEl).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount)
} else {
  mount()
}
