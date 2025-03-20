from fastapi import APIRouter

router = APIRouter()

@router.get("/hello")
def _():
    return {"Hello": "world"}

