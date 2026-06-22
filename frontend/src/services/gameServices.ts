import type { Game } from "../types/Games";

export async function postGames(folders: string[]): Promise<Game[]> {
    const response = await fetch("http://localhost:8000/games/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folders })
    })
    return await response.json()
}

export async function getGames(): Promise<Game[]> {
    const response = await fetch("http://localhost:8000/games/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })

    return await response.json()
}
