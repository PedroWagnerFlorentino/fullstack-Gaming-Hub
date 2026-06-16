import requests
import os
from dotenv import load_dotenv

load_dotenv()

CLIENT_ID = os.getenv("TWITCH_CLIENT_ID")
CLIENT_SECRET = os.getenv("TWITCH_CLIENT_SECRET")

def get_token() -> str:
    response = requests.post(
        "https://id.twitch.tv/oauth2/token",
        params={
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET,
            "grant_type": "client_credentials"
        }
    )
    return response.json()["access_token"]

def get_cover(game_title: str) -> str:
    token = get_token()  # usa a função de pedir o token para a twitch

    response = requests.post(
        "https://api.igdb.com/v4/games",
        headers={
            "Client-ID": CLIENT_ID,
            "Authorization": f"Bearer {token}"
        },
        data=f'search "{game_title}"; fields name,cover.url; limit 1;'
    )

    data = response.json()

    if not data or not data[0].get("cover"):
        return ""

    url = data[0]["cover"]["url"]  # pega a url recebida e troca o tamanho da imagem
    url = url.replace("t_thumb", "t_cover_big")
    url = "https:" + url
    return url
