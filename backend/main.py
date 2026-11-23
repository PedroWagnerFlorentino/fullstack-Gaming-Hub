from fastapi import FastAPI
import uvicorn
from routers.games import games_router
from routers.emulators import emulators_router
from routers.profile import profile_routers
from fastapi.middleware.cors import CORSMiddleware
from services.database import get_db, init_db_games, init_db_emulators, init_db_profile_settings
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    #inicía a conecção do banco de dados e cria a tabela quando o servidor inicía
    conn = get_db()
    init_db_games(conn) 
    init_db_emulators(conn) 
    init_db_profile_settings(conn) 
    yield
    conn.close() #fecha a conecção


app = FastAPI(lifespan=lifespan)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(games_router, prefix="/games", tags=["Games"])
app.include_router(emulators_router, prefix="/emulators", tags=["Emulators"])
app.include_router(profile_routers, prefix="/profile", tags=["Profile"])
@app.get("/")
def read_root():
    return {"status": "online", "message": "API rodando normalmente"}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)