import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GamesProvider } from './context/GamesContext.tsx'

createRoot(document.getElementById('root')!).render(
  <GamesProvider>
    <App />
  </GamesProvider>
)
