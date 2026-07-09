import sqlite3

def get_db():
    """Função para criar o database e a conecção"""
    conn = sqlite3.connect("gaming_hub.db")
    conn.row_factory = sqlite3.Row #Para que o cursor retorne dicionários ao invés de tuplas
    return conn

def init_db_games(conn):
    cur = conn.cursor()

    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS gaming_hub_games (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title VARCHAR(150),
            platform VARCHAR(150),
            rom_path VARCHAR(2000) UNIQUE,
            cover_url VARCHAR(500)
        );
        """
    )

    conn.commit()
    
def init_db_emulators(conn):
    cur = conn.cursor()

    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS gaming_hub_emulators (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            platform VARCHAR(150) UNIQUE,
            emulator_path VARCHAR(2000)
        );
        """
    )

    conn.commit()