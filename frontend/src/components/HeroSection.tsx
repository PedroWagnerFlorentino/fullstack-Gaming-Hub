/*
  HeroSection — jogo em destaque no topo
  Recebe o último jogo jogado e exibe com capa grande.
  Se não houver jogo, mostra um placeholder.
*/

import type { Game } from "../types/Games"
import "./componentsStyle/HeroSection.css"

interface HeroSectionProps {
  game: Game | null
  onPlay: (game: Game) => void
}

function HeroSection({ game, onPlay }: HeroSectionProps) {

  if (!game) {
    return (
      <div className="hero hero--empty">
        <p className="hero__empty-text">Nenhum jogo encontrado. Escaneie suas pastas! 🎮</p>
      </div>
    )
  }

  return (
    <div className="hero">

      {/* Grade decorativa de fundo */}
      <div className="hero__grid" aria-hidden="true" />

      {/* Brilho azul à direita */}
      <div className="hero__glow" aria-hidden="true" />

      {/* Fade suave na borda inferior — une o hero com as rows abaixo */}
      <div className="hero__fade" aria-hidden="true" />

      <div className="hero__content">

        {/* CAPA GRANDE */}
        <div className="hero__cover">
          {game.cover ? (
            <img src={game.cover} alt={`Capa de ${game.title}`} />
          ) : (
            /* fallback quando não tem capa IGDB */
            <span className="hero__cover-fallback">🎮</span>
          )}
        </div>

        {/* INFO */}
        <div className="hero__info">
          <span className="hero__tag">▶ Último jogado</span>
          <h1 className="hero__title">{game.title}</h1>

          <p className="hero__meta">
            <span>{game.platform ?? game.emulator}</span>
          </p>

          <div className="hero__buttons">
            <button
              className="hero__btn-primary"
              onClick={() => onPlay(game)}
            >
              ▶ Jogar Agora
            </button>

            <button className="hero__btn-secondary">
              ℹ Detalhes
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default HeroSection
