from fastapi import FastAPI, Depends
from pydantic import BaseModel
from datetime import date

from sqlalchemy.dialects.mysql import DATETIME
from starlette.middleware.cors import CORSMiddleware # type: ignore

app = FastAPI()

class student(BaseModel):
    first_name: str
    second_name: str
    third_name: str
    birthday: date
    number: str

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    all0a_credentials = True,
    allow_methods=["*"],
    allow_headers=["*"],
)

firstName_temp = ""
secondName_temp = ""
thirdName_temp = ""
birthday_temp = DATETIME
number_temp = ""


@app.get("/autorization")
def add_name(temp: student):
    firstName_temp = temp.first_name
    secondName_temp = temp.second_name
    thirdName_temp = temp.third_name
    birthday_temp = temp.birthday
    number_temp = temp.number



    return {"status":"ok"}








