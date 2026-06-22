import "./LibraryPage.css"
import { useState, useEffect } from "react"
import HeroSection from "../components/HeroSection"
import StatRow from "../components/StatsRow"
import Library from "./Library"
import type { Game } from "../types/Games"
import type { Dispatch, SetStateAction } from "react"
import { postGames, getGames } from "../services/gameServices"

// Seções de plataforma — adiciona novas aqui quando quiser
const PLATFORMS = [
    { section: "all", title: "Jogados Recentemente" },
    { section: "Nintendo Switch", title: "Nintendo Switch" },
    { section: "PlayStation2", title: "PlayStation 2" },
    { section: "N64", title: "Nintendo 64" },
    { section: "SNES", title: "Super Nintendo" },
    { section: "GBA", title: "Game Boy Advance" },
    { section: "Nintendo 3DS", title: "Nintendo 3DS" },
]

interface LibraryPageProps {
    search: string
    folders: string[]
    sent: boolean
    onTotalGamesChange?: Dispatch<SetStateAction<number | undefined>>
}

function LibraryPage({ search, folders, sent, onTotalGamesChange }: LibraryPageProps) {

    const [heroGame, setHeroGame] = useState<Game | null>(null)
    const [totalPlatforms, setTotalPlatforms] = useState<number | undefined>(undefined)
    const [totalGames, setTotalGames] = useState<number | undefined>(undefined)
    const [displayViewMode, setDisplayMode] = useState("rows")
    const [loading, setLoading] = useState(true)
    const [allGames, setGames] = useState<Game[]>([])
    const [gridFilter, setFilter] = useState("all")


    // Quando o Library carrega os jogos, pega o primeiro pra exibir no hero
    const handleGamesLoaded = (games: Game[]) => {
        onTotalGamesChange?.(games.length)
        setTotalGames(games.length)
        setTotalPlatforms(new Set(games.map(game => game.platform)).size)
        if (!heroGame && games.length > 0) {
            setHeroGame(games[0])
        }
    }

    const handlePlay = (game: Game) => {
        // A chamada pro backend de launch vai aqui no Sprint 5
        console.log("Jogar:", game.title, game.gameRom)
    }

    // ── BUSCA INICIAL (GET) ─────────────────────────
    useEffect(() => {
        setLoading(true)
        const buscarJogos = async () => {
            try {
                const dadosJson = await getGames()
                setGames(dadosJson)
                handleGamesLoaded(dadosJson)   // avisa o App do total de jogos
            } catch (error) {
                console.error(`Erro ao buscar jogos: ${error}`)
            } finally {
                setLoading(false)
            }
        }
        buscarJogos()
    }, [])

    // ── SCAN DE PASTA (POST) ────────────────────────
    useEffect(() => {
        if (!sent) return
        setLoading(true)
        const buscarDados = async () => {
            try {
                const dadosJson = await postGames(folders)
                setGames(dadosJson)
            } catch (error) {
                console.error(`Erro ao varrer pasta: ${error}`)
            } finally {
                setLoading(false)
            }
        }
        buscarDados()
    }, [sent])

    const filteredGames = allGames.filter(game =>
        game.title.toLowerCase().includes(search.toLowerCase()))

    const activePlatforms = ["all", ...new Set(allGames.map(game => game.platform))]

    return (
        <>
            <HeroSection
                game={heroGame}
                onPlay={handlePlay}
            />

            <StatRow
                totalGames={totalGames}
                totalPlatforms={totalPlatforms}
            />

            <div className="view-mode-selector">
                <button
                    className={displayViewMode === "grid" ? "active" : ""}
                    onClick={() => setDisplayMode("grid")}
                >GRID
                </button>
                <button
                    className={displayViewMode === "rows" ? "active" : ""}
                    onClick={() => setDisplayMode("rows")}
                >ROWS
                </button>
            </div>

            {displayViewMode === "grid" && (
                <div className="filter-grid">
                    {activePlatforms.map((platform) => (
                        <button
                            className={`filter-grid-buttons ${gridFilter === platform ? "active" : ""}`}
                            onClick={() => { setFilter(platform) }}
                        >{platform}</button>

                    ))}
                </div>
            )
            }
            {displayViewMode === "rows"
                ? (

                    PLATFORMS.map(({ section, title }) => (
                        <Library
                            key={section}
                            title={title}
                            displayViewMode={displayViewMode}
                            games={section === "all" ? filteredGames : filteredGames.filter(game => game.platform === section)}
                            loading={loading}
                        />))

                )
                : (
                    <Library
                        key={"all"}
                        title={"Todos os jogos"}
                        displayViewMode={displayViewMode}
                        games={gridFilter === "all" ? filteredGames : filteredGames.filter(game => game.platform === gridFilter)}
                        loading={loading}
                    />
                )
            }
        </>
    )
}

export default LibraryPage