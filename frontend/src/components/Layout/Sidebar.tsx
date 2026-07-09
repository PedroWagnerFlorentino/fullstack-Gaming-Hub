/*
  Sidebar — navegação lateral retrátil
  Quando collapsed=true → só ícones (56px)
  Quando collapsed=false → ícones + labels (220px)

  A transição é feita só com CSS (width + opacity),
  sem nenhuma biblioteca de animação.
*/

import { useState } from "react"
import "./Sidebar.css"
import { useGames } from "../../context/GamesContext"

interface NavItem {
  icon: string
  label: string
  id: string
}

const NAV_MAIN: NavItem[] = [
  { icon: "🎮", label: "Biblioteca", id: "library" },
  { icon: "⭐", label: "Favoritos", id: "favorites" },
]

const NAV_BOTTOM: NavItem[] = [
  { icon: "📁", label: "Pastas", id: "folders" },
  { icon: "⚙️", label: "Configurações", id: "settings" },
]

interface SidebarProps {
  activePage: string
  onNavigate: (id: string) => void
}

function Sidebar({ activePage, onNavigate }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const { allGames } = useGames()
  return (
    /*
      data-collapsed é um atributo HTML que o CSS usa como seletor.
      É uma alternativa mais limpa a ficar concatenando strings de className.
      ex: .sidebar[data-collapsed="true"] .sidebar__label { opacity: 0 }
    */
    <aside className="sidebar" data-collapsed={collapsed}>

      <nav className="sidebar__nav">
        <span className="sidebar__section-label">Menu</span>

        {NAV_MAIN.map(item => (
          <button
            key={item.id}
            className={`sidebar__item ${activePage === item.id ? "sidebar__item--active" : ""}`}
            onClick={() => onNavigate(item.id)}
            title={collapsed ? item.label : undefined}  /* tooltip só quando colapsado */
          >
            <span className="sidebar__icon">{item.icon}</span>
            <span className="sidebar__label">{item.label}</span>

            {/* Badge com total de jogos — só na Biblioteca */}
            {item.id === "library" && allGames.length != null && (
              <span className="sidebar__badge">{allGames.length}</span>
            )}
          </button>
        ))}
      </nav>

      <div className="sidebar__divider" />

      {/* NAV INFERIOR — fica no fundo da sidebar */}
      <nav className="sidebar__nav sidebar__nav--bottom">
        {NAV_BOTTOM.map(item => (
          <button
            key={item.id}
            className={`sidebar__item ${activePage === item.id ? "sidebar__item--active" : ""}`}
            onClick={() => onNavigate(item.id)}
            title={collapsed ? item.label : undefined}
          >
            <span className="sidebar__icon">{item.icon}</span>
            <span className="sidebar__label">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* BOTÃO DE COLAPSAR */}
      <button
        className="sidebar__toggle"
        onClick={() => setCollapsed(prev => !prev)}
        title={collapsed ? "Expandir" : "Recolher"}
      >
        {/* A seta muda de direção dependendo do estado */}
        <span className="sidebar__icon">{collapsed ? "›" : "‹"}</span>
        <span className="sidebar__label">Recolher</span>
      </button>

    </aside>
  )
}

export default Sidebar
