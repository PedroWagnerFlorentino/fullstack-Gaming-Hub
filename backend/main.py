from fastapi import FastAPI
from routers.games import games_router
from routers.emulators import emulators_router
from fastapi.middleware.cors import CORSMiddleware
from services.database import get_db, init_db_games, init_db_emulators
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    conn = get_db()
    init_db_games(conn) #inicía a conecção do banco de dados e cria a tabela quando o servidor inicía
    init_db_emulators(conn) #inicía a conecção do banco de dados e cria a tabela quando o servidor inicía
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
