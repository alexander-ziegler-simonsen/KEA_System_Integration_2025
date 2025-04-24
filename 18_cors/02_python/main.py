from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from datetime import datetime

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:8000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def start():
    return { "data": "start" }

@app.get("/timestamp")
def timestamp():
    return { "data": datetime.now()  }