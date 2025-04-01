from my_parser import my_parser, Person
from fastapi import FastAPI
import requests

dataParser = my_parser()



app = FastAPI()

@app.get("/fastapiData")
def getFastAPIData():
    return { "data": "Data from FastAPI" }

@app.get("/requestExpressData")
def getRequestExpressData():
    response = requests.get("http://127.0.0.1:8080/expressData").json()

    return response
