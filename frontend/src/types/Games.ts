export interface Game {
    id: number;
    title: string;
    platform: string;
    emulator: string;
    cover: string;
    genres: string;
    summary: string;
    rom_path: string;
}

export interface Emulator {
    id: number;
    platform: string;
    emulator_path: string;
}