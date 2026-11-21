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

def get_game_data(game_title: str) -> list:
    token = get_token()  # usa a função de pedir o token para a twitch

    response = requests.post(
        "https://api.igdb.com/v4/games",
        headers={
            "Client-ID": CLIENT_ID,
            "Authorization": f"Bearer {token}"
        },
        data=f'search "{game_title}"; fields name,cover.url,genres.name,summary;'
    )

    data = response.json()

    if not data:
        return ["", "", ""]

    cover_obj = data[0].get("cover", {})
    url = cover_obj.get("url", "")

    if url:
        url = "https:" + url.replace("t_thumb", "t_cover_big")

    genres = ", ".join(g["name"] for g in data[0].get("genres", []))

    summary = data[0].get("summary", "")

    return [url, genres, summary]

def get_trailer_from_igdb(game_title: str) -> str | None:
    token = get_token()  # usa a função de pedir o token para a twitch

    response = requests.post(
        "https://api.igdb.com/v4/games",
        headers={"Client-ID": CLIENT_ID, "Authorization": f"Bearer {token}"},
        data=f'search "{game_title}"; fields name,videos.name,videos.video_id; limit 1;',
        timeout=10,
    )
    response.raise_for_status()

    data = response.json()

    if not data:
        return None

    videos = data[0].get("videos", [])
    if not videos:
        return None

    best = next((v for v in videos if "trailer" in v.get("name", "").lower()), videos[0])
    return best["video_id"]