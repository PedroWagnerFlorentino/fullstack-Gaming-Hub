import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { Game } from "../types/Games"
import { getGames, postGames } from "../services/gameServices"

interface GameContextProps {
    allGames: Game[]
    loading: boolean
    scanning: boolean
    error: string | null
    fetchGames: () => Promise<void>
    scanFolders: (folders: string[]) => Promise<{ count: number }>
}

const GamesContext = createContext<GameContextProps | undefined>(undefined)

export function GamesProvider({ children }: { children: ReactNode }) {
    const [allGames, setGames] = useState<Game[]>([])
    const [loading, setLoading] = useState(true)
    const [scanning, setScanning] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchGames = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const dadosJson = await getGames()
            setGames(dadosJson)
        } catch (error) {
            setError(`Não foi possivel carregar os jogos: ${error}`)
            console.error(`Erro ao buscar jogos: ${error}`)
            throw error
        } finally {
            setLoading(false)
        }
    }, [])

    const scanFolders = useCallback(async (folders: string[]) => {
        setScanning(true)
        setError(null)
        try {
            const newGames = await postGames(folders)
            await fetchGames()
            return { count: newGames.length }
        } catch (error) {
            setError(`Erro ao cadastrar os jogos: ${error}`)
            console.error(`Erro ao cadastrar jogos: ${error}`)
            throw error
        } finally {
            setScanning(false)
        }
    }, [fetchGames])


    return (
        <GamesContext.Provider value={{ allGames, loading, scanning, error, fetchGames, scanFolders }}>
            {children}
        </GamesContext.Provider>
    )
}

export function useGames() {
  const context = useContext(GamesContext)
  if (!context) throw new Error("useGames deve ser usado dentro de um GamesProvider")
  return context
}