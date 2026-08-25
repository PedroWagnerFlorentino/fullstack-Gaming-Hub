import "./componentsStyle/GameCard.css"

interface GameCardProps {
  title: string
  emulator: string
  cover: string
  executablePath: string
  platform?: string
  onOpenDetails: () => void
}

function GameCard({title, emulator, cover, platform, onOpenDetails }: GameCardProps) {
  return (
    <div className="game-card" onClick={onOpenDetails}>

      {/* CAPA */}
      <div className="game-card__cover">

        {cover ? (
          <img src={cover} alt={`Capa de ${title}`} />
        ) : (
          <span className="game-card__cover-fallback">🎮</span>
        )}

        {/* Badge da plataforma (ex: "N64") */}
        {platform && (
          <span className="game-card__platform">{platform}</span>
        )}

        <div className="game-card__overlay">
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
