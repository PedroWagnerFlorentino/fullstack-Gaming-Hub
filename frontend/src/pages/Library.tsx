import GameCard from "../components/GameCard"
import { getGames } from "../services/gameServices"
import type { Game } from "../types/Games"
import { useEffect, useState } from "react"

interface LibraryProps {
    gameSection: string //representa a secao que tem que mostrar os jogos, ex: ps2, switch, p1, etc
    search: string
    folders: string[]
    sent: boolean
}


function Library({ gameSection, search, folders, sent }: LibraryProps) {

    const [games, setGames] = useState<Game[]>([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        if (!sent) return // caso nenhuma pasta for envivada já retorna

        setLoading(true)
        const buscarDados = async () => {
            try {
                const dadosJson = await getGames(folders)
                setGames(dadosJson);
                setLoading(false)
            }
            catch (error) {
                console.error(`Erro ao varrer pasta ${error}`)
            }
        }
        buscarDados()
    }, [sent]) //atualiza quando sent muda

    const filteredGames = games.filter((game) =>
        game.title.toLowerCase().includes(search.toLowerCase()) // se o titulo do jogo estiver na pesquisa ele vai para a variavel
    );

    const baseList = search !== "" ? filteredGames : games

    const displayList = gameSection === "all" ? baseList : baseList.filter(game => game.platform === gameSection)

    if (loading && sent) {
        return <p>Loading ...</p>
    }

    if (displayList) {
        return (
            displayList.map((game) => (
                <GameCard
                    title={game.title}
                    emulator={game.emulator}
                    cover={game.cover}
                    executablePath={game.gameRom}
                />))
        )
    }
    
    return null
}
export default Library;