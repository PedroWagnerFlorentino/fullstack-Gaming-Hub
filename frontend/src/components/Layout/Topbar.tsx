/*
  Topbar — substitui Header.tsx e SearchBar.tsx
  Props:
    - search / setSearch  → mesma lógica do SearchBar antigo
    - onScan              → dispara o POST /games/scan
    - isScanning          → mostra estado de loading
*/

import type { Dispatch, SetStateAction } from "react"
import "./Topbar.css"

interface TopbarProps {
  search: string
  setSearch: Dispatch<SetStateAction<string>>
}

function Topbar({ search, setSearch }: TopbarProps) {
  return (
    <header className="topbar">

      {/* LOGO */}
      <div className="topbar__logo">
        <div className="topbar__logo-icon">G</div>
        <span className="topbar__logo-text">Gaming Hub</span>
      </div>

      {/* SEARCH — mesma lógica do SearchBar.tsx, só visual novo */}
      <div className="topbar__search">
        <span className="topbar__search-icon">🔍</span>
        <input
          type="text"
          placeholder="Buscar jogos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Buscar jogos"
        />
      </div>

      {/* ACTIONS */}
      <div className="topbar__actions">

        {/* Avatar */}
        <div className="topbar__avatar">P</div>
      </div>

    </header>
  )
}

export default Topbar
