import "./GameCard.css"
interface GameCardProps {
    title: string;
    emulator: string;
    cover: string;
    executablePath: string
}

function GameCard({ title, emulator, cover }: GameCardProps) {
    return (
        <div className="game-card">
            <img src={cover} alt={`Capa do jogo ${title}`} />

            <h1>{title}</h1>

            <p>{emulator}</p>

            <button>Jogar</button>
        </div>
    )
}

export default GameCard;