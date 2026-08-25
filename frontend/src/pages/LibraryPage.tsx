import "./LibraryPage.css"
import { useState, useEffect } from "react"
import HeroSection from "../components/HeroSection"
import StatRow from "../components/StatsRow"
import Library from "./Library"
import type { Game } from "../types/Games"
import { launchGame } from "../services/gameServices"
import { useGames } from "../context/GamesContext"
import { useToast } from "../context/ToastContext"
import "../components/GameDetailModal"
import GameDetailsModal from "../components/GameDetailModal"


// Seções de plataforma — adiciona novas aqui quando quiser
const PLATFORMS = [
    { section: "all", title: "Jogados Recentemente" },
    { section: "Nintendo Switch", title: "Nintendo Switch" },
    { section: "PlayStation2", title: "PlayStation 2" },
    { section: "N64", title: "Nintendo 64" },
    { section: "SNES", title: "Super Nintendo" },
    { section: "GBA", title: "Game Boy Advance" },
    { section: "Nintendo 3DS", title: "Nintendo 3DS" },
    { section: "Nintendo DS", title: "Nintendo DS" },
]

interface LibraryPageProps {
    search: string
}

function LibraryPage({ search }: LibraryPageProps) {

    const { clear, showError, showSuccess } = useToast()
    const { allGames, loading, fetchGames } = useGames()

    const [heroGame, setHeroGame] = useState<Game | null>(null)
    const [displayViewMode, setDisplayMode] = useState("rows")
    const [gridFilter, setFilter] = useState("all")
    const totalPlatforms = new Set(allGames.map(game => game.platform)).size
    const [selectedGame, setSelectedGame] = useState<Game | null>(null)

    const handlePlay = async (game: Game) => {
        clear()
        try {
            const response = await launchGame(game.id)
            if (!response.ok) {
                const erro = await response.json().catch(() => null) 
                showError(erro?.detail ?? "Erro ao iniciar o jogo!")
            } else {
                showSuccess("Jogo iniciando aguarde")
            }
        }
        catch (error) {
            showError(`Erro ao iniciar o jogo! Erro detalhado: ${error}`)
        }
    }

    // Disparar o fetch sempre que a página é montada
    useEffect(() => {
        clear()
        try {
            fetchGames()
        }
        catch (error) {
            showError(`Erro ao buscar os jogos! Erro detalhado: ${error}`)
        }
    }, [])

    useEffect(() => {
        if (!heroGame && allGames.length > 0) {
            setHeroGame(allGames[0])
        }
    }, [allGames])



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
                totalGames={allGames.length}
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
                            onOpenDetails={setSelectedGame}
                        />))

                )
                : (
                    <Library
                        key={"all"}
                        title={"Todos os jogos"}
                        displayViewMode={displayViewMode}
                        games={gridFilter === "all" ? filteredGames : filteredGames.filter(game => game.platform === gridFilter)}
                        loading={loading}
                        onOpenDetails={setSelectedGame}
                    />
                )
            }
            <GameDetailsModal
                game={selectedGame}
                onClose={() => setSelectedGame(null)}
                onPlay={(game) => {
                    handlePlay(game)
                    setSelectedGame(null)
                }}
            />
        </>
    )
}

export default LibraryPage