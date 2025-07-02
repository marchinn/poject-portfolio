 from fastapi import FastAPI, HTTPException, Depends, File, UploadFile, Form
 from fastapi.middleware.cors import CORSMiddleware
 from sqlalchemy.orm import Session
 from typing import List
 import shutil, os
 from passlib.context import CryptContext
 from datetime import datetime, timedelta
 import jwt
 from database import Session as DBSession, Base, engine, Student, Admin,
 Achievement
 from pydantic import BaseModel
 from datetime import date

app = FastAPI()
origins = ["http://locslhost:3000"]
app.add_middleware(CORSMiddleware, 
                   allow_origins = origins, 
                   allow_methods = ["*"], 
                   allow_headers=["*"], allow_credentials = True)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated = "auto")
SECRET_KEY = "change_this_in_production"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

db = DBSession()
if not db.query(Admin).first():
    hashed_admin_pw = pwd_context.hash("admin") # хешируем пароль
    admin = Admin(login="admin", password_hash=hashed_admin_pw)
    db.add(admin)
    db.commit()
    db.close()

class  StudentCreate(BaseModel):
    first_name: str
    second_name: str
    third_name: None
    birthday: date
    number: str
    login: str
    password: str

class StudentOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    third_name: str = None
    date_of_birth: date
    student_id_number: str
    login: str
class Config:
     orm_mode = True
class AchievementOut(BaseModel):
    id: int
    title: str
    date_received: date
    level: str
    status: str
    file_path: str
    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)
def get_password_hash(password):
    return pwd_context.hash(password)
def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta if expires_delta else timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def authenticate_user(login: str, password: str):
    db = DBSession()
    user = db.query(Student).filter(Student.login == login).first()
    role = "student"
    if not user:
        user = db.query(Admin).filter(Admin.login == login).first()
        role = "admin"
    if not user or not verify_password(password, user.password_hash):
        db.close()
        return None
    db.close()
    return {"user": user, "role": role}


from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
bearer_scheme = HTTPBearer()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        login = payload.get("sub")
        role = payload.get("role")
        if login is None or role is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    db = DBSession()
    user = None
    if role == "student":
        user = db.query(Student).filter(Student.login == login).first()
    else:
        user = db.query(Admin).filter(Admin.login == login).first()
    db.close()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    user.role = role
    return user

# 1. Регистрация студента
@app.post("/registration", response_model=StudentOut)
def register_student(student: StudentCreate):
    db = DBSession()
    # Проверяем, что логин не занят
    if db.query(Student).filter(Student.login == student.login).first():
        db.close()
        raise HTTPException(status_code=400, detail="Login already registered")
    hashed_pw = get_password_hash(student.password)
    new_student = Student(
        first_name=student.first_name, last_name=student.last_name,
        third_name=student.third_name, date_of_birth=student.date_of_birth,
        student_id_number=student.student_id_number, login=student.login,
        password_hash=hashed_pw, image=""  # аватарка не используется
    )
    db.add(new_student)
    db.commit()
    db.refresh(new_student)
    db.close()
    return new_student

# 2. Авторизация (логин) студента или админа
@app.post("/authorization", response_model=Token)
def authorize(login: str = Form(...), password: str = Form(...)):
    auth = authenticate_user(login, password)
    if not auth:
        raise HTTPException(status_code=401, detail="Invalid login or password")
    user = auth["user"]
    role = auth["role"]
    access_token = create_access_token(
        data={"sub": user.login, "role": role},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    return {"access_token": access_token, "token_type": "bearer"}

# 3. Загрузка достижения (студент)
@app.post("/achievements", response_model=AchievementOut)
async def upload_achievement(
    title: str = Form(...), date_received: date = Form(...),
    level: str = Form(...), status: str = Form(...),
    file: UploadFile = File(...),
    current_user=Depends(get_current_user)
):
    # Разрешено только студентам
    if getattr(current_user, 'role', None) != "student":
        raise HTTPException(status_code=403, detail="Only students can add achievements")
    # Сохраняем файл локально
    file_path = f"{UPLOAD_DIR}/{current_user.id}_{file.filename}"
    with open(file_path, "wb") as f:
        shutil.copyfileobj(file.file, f)
    # Сохраняем информацию в БД
    db = DBSession()
    ach = Achievement(
        title=title, date_received=date_received, level=level,
        status=status, file_path=file_path, student_id=current_user.id
    )
    db.add(ach)
    db.commit()
    db.refresh(ach)
    db.close()
    return ach

# 4. Просмотр достижений
@app.get("/achievements", response_model=List[AchievementOut])
def list_achievements(current_user=Depends(get_current_user)):
    db = DBSession()
    if getattr(current_user, 'role', None) == "admin":
        records = db.query(Achievement).all()  # админ видит все
    else:
        records = db.query(Achievement).filter(Achievement.student_id == current_user.id).all()
    db.close()
    return records

# Дополнительно: список всех студентов (для админа)
@app.get("/students", response_model=List[StudentOut])
def list_students(current_user=Depends(get_current_user)):
    if getattr(current_user, 'role', None) != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    db = DBSession()
    students = db.query(Student).all()
    db.close()
    return students