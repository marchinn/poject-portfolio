from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Session as DBSession, Base, engine, Student
from pydantic import BaseModel
from datetime import date
app = FastAPI()

origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class  StudentCreate(BaseModel):
    first_name: str
    last_name: str
    third_name: str
    date_of_birth: date
    student_id_number: str
    login: str
    password: str

class StudentOut(BaseModel):
    # id: int
    first_name: str
    last_name: str
    third_name: str
    date_of_birth: date
    student_id_number: str
    login: str
    password: str

#-------------------------- 1. Регистрация студента --------------------------------

@app.post("/registration", response_model=StudentOut)
def register_student(student: StudentCreate):
    print("Полученные данные:", student)
    db = DBSession()
    new_student = Student(
        first_name=student.first_name,
        last_name=student.last_name,
        third_name=student.third_name,
        date_of_birth=student.date_of_birth,
        student_id_number=student.student_id_number,
        login=student.login,
        password=student.password
    )
    db.add(new_student)
    db.commit()
    db.refresh(new_student)
    db.close()
    return new_student