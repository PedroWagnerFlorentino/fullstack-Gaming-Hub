from fastapi import APIRouter
from pydantic import BaseModel
from services.igdb import get_cover
import os, re, subprocess

class ScanRequest(BaseModel):
    folders: list[str]

class LaunchPath(BaseModel):
    emulator_path: str
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
                clean_name_game = clean_title(name)
                
                game = {
                    "title": clean_name_game,
                    "platform": ROM_EXTENSIONS[ext],
                    "rom_path": os.path.join(folder, file),
                    "cover": get_cover(clean_name_game),
                    "emulator_path": ""
                }
                games.append(game)

    return games


@router.post("/launch")
def launch_game(paths: LaunchPath):
    try:
        subprocess.Popen([paths.emulator_path, paths.rom_path])

    except FileNotFoundError:
        return {"message": "Emulador ou ROM não encontrado. Revise os caminhos."}
    except OSError as e:
        return {"message": f"Ocorreu um erro ao executar: {e}"}
    
    return {"message": "Jogo executado com sucesso aguarde a execussão."}
