from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import StreamingResponse
from datetime import datetime
import asyncio
import random

app = FastAPI()

# this is used for setting up a folder for static files
templates = Jinja2Templates(directory="templates")

@app.get("/")
def server_root_page(request: Request):
    return templates.TemplateResponse("index.html", { "request": request })

async def date_generator():
    while True:
        now = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
        yield f"data: {now}\n\n"
        await asyncio.sleep(1)

@app.get("/sse")
def sse():
    return StreamingResponse(date_generator(), media_type="text/event-stream")

async def kongfu_generator():
    while True:
        hits = [ "EEE-YA", "EII-YA", "EEIII!", "YA!", "oda oda oda oda oda !!!!" ]
        yield f"data: {random.choice(hits)}\n\n"
        await asyncio.sleep(1)

@app.get("/kong_fu")
def kongfu():
    return StreamingResponse(kongfu_generator(), media_type="text/event-stream")