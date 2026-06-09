import GameCard from "../components/GameCard"
import getGames from "../services/gameServices"

interface LibraryProps {
    gameSection: string //representa a secao que tem que mostrar os jogos, ex: ps2, switch, p1, etc
    search: string
}
function Library({ gameSection, search }: LibraryProps) {

    const games = getGames();

    const filteredGames = games.filter((game) => 
        game.title.toLowerCase().includes(search.toLowerCase()) // se o titulo do jogo estiver na pesquisa ele vai para a variavel
    );
    if(search !== ""){
     return (
            filteredGames.map((game) => (
            <GameCard
                title={game.title}
                emulator={game.emulator}
                cover={game.cover}
            />))
        );
    }
    const ps2games = games.filter(
        game => game.platform === "Plastation2"
    );
    const nsGames = games.filter(
        game => game.platform === "Nintendo Switch"
    );
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