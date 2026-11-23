import os
from services.database import get_db


def set_settings(key: str, value: str):
    """Função para setar as configurações do IGDB"""
    conn = get_db()
    try:
        cur = conn.cursor()

        cur.execute(
            """
            INSERT INTO gaming_hub_settings (key, value) 
            VALUES (?, ?)
            ON CONFLICT(key) DO UPDATE SET value = excluded.value
            """,
            (key, value),
        )

        conn.commit()
    finally:
        conn.close()

def get_settings(key: str):
    """Função para pegar as configurações do IGDB"""
    conn = get_db()
    try:
        cur = conn.cursor()

        cur.execute(
            """
            SELECT value FROM gaming_hub_settings WHERE key = ?
            """,
            (key,),
        )

        result = cur.fetchone()
        return result["value"] if result else None
    finally:
        conn.close()

def delete_settings(key: str):
    """Função para deletar as configurações do IGDB"""
    conn = get_db()
    try:
        cur = conn.cursor()

        cur.execute(
            """
            DELETE FROM gaming_hub_settings WHERE key = ?
            """,
            (key,),
        )

        conn.commit()
    finally:
        conn.close()


def get_config(key: str, env_var):
    """Função para pegar as configurações do IGDB"""
    if get_settings(key):
        return get_settings(key), "database"
    elif os.getenv(env_var):
        return os.getenv(env_var), "env"
    else:
        return None, None



