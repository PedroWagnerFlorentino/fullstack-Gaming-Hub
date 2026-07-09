import type { Game, Emulator } from "../types/Games";

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

export async function getEmulators(): Promise<Emulator[]> {
    const response = await fetch("http://localhost:8000/emulators/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })

    return await response.json()
}

export async function postEmulator(platform: string, emulator_path: string) {
    const response = await fetch("http://localhost:8000/emulators/register-emulators", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform, emulator_path })
    })
    return await response.json()

}

export async function deleteEmulator(emulator_id: number) {
    const response = await fetch(`http://localhost:8000/emulators/del-emulator/${emulator_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    })
    return await response.json()

}

export async function launchGame(game_id: number) {
    const response = await fetch(`http://localhost:8000/emulators/launch/${game_id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    })
    return await response.json()

}