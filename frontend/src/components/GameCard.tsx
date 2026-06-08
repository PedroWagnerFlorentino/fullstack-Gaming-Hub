import "./GameCard.css"
interface GameCardProps {
    title: string;
    emulator: string;
    cover: string
}

function GameCard({ title, emulator, cover }: GameCardProps) {
    return (
        <header className="game-card">
            <img src={cover} alt={`Capa do jogo ${title}`} />

            <h1>{title}</h1>

            <p>{emulator}</p>

            <button>Jogar</button>
        </header>
    )
}

export default GameCard;