from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.igdb import InvalidCredentialsError, request_token
from services.igdb import request_token
from services.settings import delete_settings, set_settings, get_config
import requests
class ConfigRequest(BaseModel):
    client_id: str
    client_secret: str

class ConfigResponse(BaseModel):
    configured: bool
    client_id: str | None = None
    source: str | None = None

profile_routers = APIRouter()


@profile_routers.get("/get_config")
def get_configs():
    client_id, source = get_config("igdb_client_id", "TWITCH_CLIENT_ID")
    return ConfigResponse(configured=True if client_id else False, client_id=client_id, source=source)

@profile_routers.post("/set_config")
def set_config(config: ConfigRequest):
    client_id = config.client_id.strip()
    client_secret = config.client_secret.strip()

    if not client_id or not client_secret:
        raise HTTPException(status_code=400, detail="Client ID and Client Secret cannot be empty.")
    
    try:
        request_token(client_id, client_secret)  # Verifica se as credenciais são válidas
    except InvalidCredentialsError:
        raise HTTPException(status_code=400, detail="Invalid credentials.")
    except requests.RequestException:
        raise HTTPException(status_code=502, detail="Error connecting to Twitch.")

    
    set_settings("igdb_client_id", client_id)
    set_settings("igdb_client_secret", client_secret)

    return ConfigResponse(configured=True if client_id else False, client_id=client_id, source="database")


@profile_routers.delete("/delete_config")
def delete_config():
    delete_settings("igdb_client_id")
    delete_settings("igdb_client_secret")
    return ConfigResponse(configured=False, client_id=None, source=None)