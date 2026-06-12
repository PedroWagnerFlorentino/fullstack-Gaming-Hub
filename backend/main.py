from fastapi import FastAPI
from routers.games import router

app = FastAPI()

app.include_router(router, prefix="/games", tags=["Games"])

@app.get("/")
def root():
    return {"Message": "Gamimng Hub API"}