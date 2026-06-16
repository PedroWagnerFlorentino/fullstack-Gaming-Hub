// import { games } from "../data/games"
import type { Game } from "../types/Games";

export async function getGames(folders: string[]): Promise<Game[]> {
    const response = await fetch("http://localhost:8000/games/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folders })
    })
    return await response.json()
}

