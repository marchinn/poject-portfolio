from sqlalchemy import Column, Integer, String, Date, create_engine
from sqlalchemy.orm import declarative_base, relationship, sessionmaker
from passlib.context import CryptContext

# Подключение к SQLite-базе данных
engine = create_engine(
    "sqlite:///C:/Users/iminl/Documents/React Apps/my-app/notes.db",  # Путь к файлу базы
    echo=False,
    connect_args={"check_same_thread": False}
)

Base = declarative_base()
Session = sessionmaker(bind=engine, autoflush=False, autocommit=False)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

#  ----------------- Модель студента
class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    last_name = Column(String, nullable=False)       
    first_name = Column(String, nullable=False)      
    third_name = Column(String)                     
    date_of_birth = Date()  
    student_id_number = Column(String, unique=True, nullable=False)  
    login = Column(String, unique=True, nullable=False)             
    password = Column(String, nullable=False)                 


def init_db():
    Base.metadata.create_all(engine)  # Создание всех таблиц

init_db()