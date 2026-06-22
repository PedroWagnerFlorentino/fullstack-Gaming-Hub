from fastapi import FastAPI
from routers.games import router
from fastapi.middleware.cors import CORSMiddleware
from services.database import get_db, init_db
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    conn = get_db()
    init_db(conn) #inicía a conecção do banco de dados e cria a tabela quando o servidor inicía
    yield
    conn.close() #fecha a conecção


app = FastAPI(lifespan=lifespan)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(router, prefix="/games", tags=["Games"])


@app.get("/")
def root():
    return {"Message": "Gamimng Hub API"}