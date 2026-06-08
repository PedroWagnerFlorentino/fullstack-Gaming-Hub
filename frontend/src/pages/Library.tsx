import GameCard from "../components/GameCard"
import type { Game } from "../types/Games"

interface LibraryProps {
    gameSection: string //representa a secao que tem que mostrar os jogos, ex: ps2, switch, p1, etc
}
function Library({ gameSection }: LibraryProps) {
    const games: Game[] = [
        {
            id: 1,
            title: "God of War",
            platform: "Plastation2",
            emulator: "Ps2",
            cover: ""
        },
        {
            id: 2,
            title: "Pokemon Sword",
            platform: "Nintendo Switch",
            emulator: "Switch",
            cover: ""
        },
        {
            id: 3,
            title: "Scaler",
            platform: "Plastation2",
            emulator: "Ps2",
            cover: ""
        },
        {
            id: 4,
            title: "Mario Odsei",
            platform: "Nintendo Switch",
            emulator: "Switch",
            cover: ""
        }
    ];

    const ps2games = games.filter(
        game => game.platform === "Plastation2"
    );
    const nsGames = games.filter(
        game => game.platform === "Nintendo Switch"
    )
    if (gameSection === "all") {
        return (
            games.map((game) => (
                <GameCard
                    title={game.title}
                    emulator={game.emulator}
                    cover={game.cover}
                />
            ))
        )
    };
    if (gameSection === "ps2") {
        return (
            ps2games.map((game) => (

                <GameCard
                    title={game.title}
                    emulator={game.emulator}
                    cover={game.cover}
                />
            ))
        )
    };
    if (gameSection === "switch") {
        return (
            nsGames.map((game) => (

                <GameCard
                    title={game.title}
                    emulator={game.emulator}
                    cover={game.cover}
                />
            ))
        )
    }
}
export default Library;