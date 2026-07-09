import sqlite3
from pydantic import BaseModel
from fastapi import APIRouter, HTTPException
from services.database import get_db
import subprocess

emulators_router = APIRouter()

class EmulatorRegister(BaseModel):
    platform: str
    emulator_path: str

class EmulatorsResponse(BaseModel):
    id: int
    platform: str
    emulator_path: str

class LaunchPath(BaseModel):
    emulator_path: str
    rom_path: str


def launch_game(paths: LaunchPath):
    try:
        subprocess.Popen([paths.emulator_path, paths.rom_path])

    except FileNotFoundError:
        return {"message": "Emulador ou ROM não encontrado. Revise os caminhos."}
    except OSError as e:
        return {"message": f"Ocorreu um erro ao executar: {e}"}
    
    return {"message": "Jogo executado com sucesso aguarde a execussão."}

@emulators_router.post("/register-emulators")
def register_emulator(paths: EmulatorRegister):
    conn = get_db()
    cur = conn.cursor()

    cur.execute(
        """
        INSERT OR REPLACE INTO gaming_hub_emulators
        (platform, emulator_path)
        VALUES (?, ?)
        """, (paths.platform, paths.emulator_path)
    )

    conn.commit()
    conn.close()
    return {"message": f"emulador cadastrado com sucesso para a plataforma: {paths.platform}"}

@emulators_router.get("/")
def get_emulators():
    conn = get_db()
    cur = conn.cursor()

    cur.execute("SELECT * FROM gaming_hub_emulators")

    emulators = [dict(row) for row in cur.fetchall()]
    formated_emulators = []
    for emulator in emulators:
        formated_emulators.append(EmulatorsResponse(
            id=emulator["id"],
            platform=emulator["platform"],
            emulator_path=emulator["emulator_path"]
        ))

    conn.close()
    return formated_emulators

@emulators_router.delete("/del-emulator/{id}")
def emulator_delete(id: int):
    conn = get_db()
    cur = conn.cursor()

    try:
        cur.execute("DELETE FROM gaming_hub_emulators WHERE id = ?", (id,))
        conn.commit()
        message = {"message": "Emulador deletado com sucesso!"}
    except sqlite3.Error as e:
        message = {"message": f"Erro ao deletar o emulador {e}"}
    conn.close()
    return message

@emulators_router.post("/launch/{game_id}")
def lauch_requisition(game_id :int):
    conn = get_db()
    cur = conn.cursor()

    try:
        cur.execute("SELECT platform, rom_path FROM gaming_hub_games WHERE id = ?", (game_id,))
        game = cur.fetchone()

        if game is None:
            raise HTTPException(status_code=404, detail="Jogo não encontrado")
        
        game_platform, game_path = game

        cur.execute("SELECT emulator_path FROM gaming_hub_emulators WHERE platform = ?", (game_platform,))
        emulator_row = cur.fetchone()

        if emulator_row is None:
            raise HTTPException(status_code=404, detail="Emulador não encontrado")
        
        emulator_path = emulator_row[0]

    except sqlite3.Error as e:
        conn.close()
        raise HTTPException(status_code=500, detail=f"Erro no banco de dados: {e}")
    
    conn.close()
    return launch_game(LaunchPath(emulator_path=emulator_path, rom_path=game_path))