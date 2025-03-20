from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

@router.get("/hello")
def _():
    return {"Hello": "world"}

# this is like extension (BaseModel)
class Spacecraft(BaseModel):
    id: int
    name: str

class SpacecraftRequestModel(BaseModel):
    name: str


def base(number: int): 
    return number

Spacecrafts = [
    Spacecraft(id=1, name="Apollo 13"),
    Spacecraft(id=2, name="Challenger"),
    Spacecraft(id=3, name="Enterprise")
]

@router.get("/api/spacecrafts", tags=["spacecraft"], response_model=list[Spacecraft])
async def get_spacecrafts():
    return Spacecrafts

@router.get("/api/spacecrafts/{spacecraft_id}", tags=["spacecraft"], response_model=Spacecraft)
def get_spacecraft_by_id(spacecraft_id: int):
    for spacecraft in Spacecrafts:
        if spacecraft.id == spacecraft_id:
            return spacecraft
    # here if no one 
    raise HTTPException(status_code=404, detail="Spacecraft not found")


# @router.post("/api/spacecrafts", tags=["spacecraft"], response_model=SpacecraftRequestModel)
# def create_spacecraft(spacecraft: SpacecraftRequestModel):
#     spacecraft.append(id=5, name=spacecraft.name)
#     return spacecraft

@router.post("/api/spacecrafts", tags=["spacecraft"], response_model=Spacecraft)
def create_spacecraft(spacecraft: Spacecraft):
    spacecraft.append(spacecraft)
    return spacecraft
