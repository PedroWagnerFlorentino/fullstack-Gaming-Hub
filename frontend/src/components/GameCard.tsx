/*
  GameCard — substitui o GameCard.tsx atual
  Mesmas props de antes, visual novo estilo Netflix portrait.

  O HOVER usa só CSS — sem useState, sem JS.
  O overlay com o botão "Jogar" aparece via .game-card:hover .game-card__overlay
*/

import "./GameCard.css"

interface GameCardProps {
  title: string
  emulator: string
  cover: string
  executablePath: string
  platform?: string
}

function GameCard({ title, emulator, cover, platform }: GameCardProps) {
  return (
    <div className="game-card">

      {/* CAPA */}
      <div className="game-card__cover">

        {cover ? (
          <img src={cover} alt={`Capa de ${title}`} />
        ) : (
          <span className="game-card__cover-fallback">🎮</span>
        )}

        {/* Badge da plataforma (ex: "N64") no canto superior direito */}
        {platform && (
          <span className="game-card__platform">{platform}</span>
        )}

        {/*
          Overlay que aparece no hover.
          O CSS faz isso: .game-card:hover .game-card__overlay { opacity: 1 }
          Sem nenhum JS ou useState!
        */}
        <div className="game-card__overlay">
          <button className="game-card__play-btn">▶ Jogar</button>
        </div>

      </div>

      {/* INFO ABAIXO DA CAPA */}
      <div className="game-card__info">
        <p className="game-card__title">{title}</p>
        <p className="game-card__sub">{emulator}</p>
      </div>

    </div>
  )
}

export default GameCard
