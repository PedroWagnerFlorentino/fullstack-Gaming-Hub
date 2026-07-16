import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GamesProvider } from './context/GamesContext.tsx'
import { ToastProvider } from './context/ToastContext.tsx'

createRoot(document.getElementById('root')!).render(
  <ToastProvider>
    <GamesProvider>
      <App />
    </GamesProvider>
  </ToastProvider>
)
