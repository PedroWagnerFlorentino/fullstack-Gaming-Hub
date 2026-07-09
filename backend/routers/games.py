from fastapi import APIRouter
from pydantic import BaseModel
from services.igdb import get_cover
from services.database import get_db
import os, re

class ScanRequest(BaseModel):
    folders: list[str]


class GamesResponse(BaseModel):
    id: int
    title: str
    platform: str
    cover: str | None = None
    rom_path: str


def clean_title(filename: str) -> str:
    """Function for clean the game title"""
    #remove tudo entre parenteses e colchetes
    cleaned = re.sub(r'\[.*?\]', '', filename)
    cleaned = re.sub(r'\(.*?\)', '', cleaned)

    #remove todos os hifens e underscores
    cleaned = re.sub(r'[-_]+', ' ', cleaned)

    #remove remove espaços duplos
    cleaned = re.sub(r'\s+', ' ', cleaned)
    return cleaned.strip()

ROM_EXTENSIONS = {
    ".iso": "PlayStation2",
    ".bin": "PlayStation2",
    ".nsp": "Nintendo Switch",
    ".xci": "Nintendo Switch",
    ".3ds": "Nintendo 3DS",
    ".nds": "Nintendo DS"
}

games_router = APIRouter()

@games_router.get("/", response_model=list[GamesResponse])
def get_games():
    conn = get_db()
    cur = conn.cursor()

    cur.execute("SELECT * FROM gaming_hub_games")

    games = [dict(row) for row in cur.fetchall()]
    games_formatados = []
    
    for game in games:
        games_formatados.append(GamesResponse(
            id=game["id"],
            title=game["title"],
            platform=game["platform"],
            cover=game["cover_url"],
            rom_path=game["rom_path"],
        ))

    conn.close()
    return games_formatados


@games_router.post("/scan")
def scan_folder(folders: ScanRequest):
    games = []
    conn = get_db()
    cur = conn.cursor()

    for folder in folders.folders:
        for file in os.listdir(folder):
            name, ext = os.path.splitext(file)

            if ext in ROM_EXTENSIONS:
                clean_name_game = clean_title(name)
                
                game = {
                    "title": clean_name_game,
                    "platform": ROM_EXTENSIONS[ext],
                    "rom_path": os.path.join(folder, file),
                    "cover": get_cover(clean_name_game),
                }

                cur.execute(
                            """
                            INSERT OR IGNORE INTO gaming_hub_games
                            (title, platform, rom_path, cover_url)
                            VALUES (?, ?, ?, ?)
                            """, (game["title"], game["platform"], game["rom_path"], game["cover"])
                          )
                games.append(game)
        
    conn.commit()
    conn.close()
    return games


