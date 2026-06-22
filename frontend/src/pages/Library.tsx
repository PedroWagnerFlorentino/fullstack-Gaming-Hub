import GameCard from "../components/GameCard"
import type { Game } from "../types/Games"
import "./Library.css"

interface LibraryProps {
  loading: boolean
  games: Game[]
  displayViewMode: string
  title?: string          // título da seção ex: "Nintendo Switch"
}

function Library({ games, displayViewMode, title, loading }: LibraryProps) {

  // Não renderiza a seção se não tiver jogos 
  if (!loading && games.length === 0) return null

  return (
    <section className="library-row">

      {/* CABEÇALHO DA SEÇÃO */}
      <div className="library-row__header">
        <h2 className="library-row__title">
          <span className="library-row__accent">▍</span>
          {title}
          {!loading && (
            <span className="library-row__count">{games.length} jogos</span>
          )}
        </h2>
      </div>


      {/* LOADING */}
      {loading && (
        <div className="library-row__loading">
          <div className="library-row__skeleton" />
          <div className="library-row__skeleton" />
          <div className="library-row__skeleton" />
          <div className="library-row__skeleton" />
        </div>
      )}

      {/* CARDS — scroll horizontal */}
      {!loading && (
        <div
          className={displayViewMode === "rows" ? "library-row__cards" : "library-row__grid"}
          /*
            drag-to-scroll: feito com JS inline (onMouseDown etc)
            pra não precisar de uma biblioteca pra isso
          */
          onMouseDown={displayViewMode === "rows" ? (e) => {
            const el = e.currentTarget
            let startX = e.pageX - el.offsetLeft
            let scrollLeft = el.scrollLeft
            let dragging = true

            const onMove = (ev: MouseEvent) => {
              if (!dragging) return
              const x = ev.pageX - el.offsetLeft
              el.scrollLeft = scrollLeft - (x - startX) * 1.2
            }
            const onUp = () => { dragging = false }

            window.addEventListener("mousemove", onMove)
            window.addEventListener("mouseup", onUp, { once: true })
          }
            : undefined
          }
        >
          {games.map(game => (
            <GameCard
              key={game.id ?? game.title}
              title={game.title}
              emulator={game.emulator}
              cover={game.cover}
              executablePath={game.gameRom}
              platform={game.platform}
            />
          ))}
        </div>
      )}

    </section>
  )
}

export default Library
