from fastapi import APIRouter
from pydantic import BaseModel
import os, re

class ScanRequest(BaseModel):
    folders: list[str]

def clean_title(filename: str) -> str:

    cleaned = re.sub(r'\[.*?\]', '', filename)
    return cleaned.strip()


ROM_EXTENSIONS = {
    ".iso": "PlayStation2",
    ".bin": "PlayStation2",
    ".nsp": "Nintendo Switch",
    ".xci": "Nintendo Switch",
    ".3ds": "Nintendo 3DS"
}

router = APIRouter()

@router.get("/")
def get_games():
    return []


@router.post("/scan")
def scan_folder(folders: ScanRequest):
    games = []
    
    for folder in folders.folders:
        for file in os.listdir(folder):
            name, ext = os.path.splitext(file)

            if ext in ROM_EXTENSIONS:
                game = {
                    "title": clean_title(name),
                    "plataform": ROM_EXTENSIONS[ext],
                    "rom_path": os.path.join(folder, file),
                    "cover": "",
                    "emulator_path": ""
                }
                games.append(game)

    return games