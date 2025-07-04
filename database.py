from sqlalchemy import Column, Integer, String, ForeignKey, Date, create_engine
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
    password_hash = Column(String, nullable=False)                 

    # # Один студент может иметь много достижений
    # achievements = relationship("Achievement", back_populates="student")

# #  Модель достижения
# class Achievement(Base):
#     __tablename__ = "achievements"

#     id = Column(Integer, primary_key=True)
#     title = Column(String, nullable=False)           # Название достижения
#     # date_received = Date(String, nullable=False)   # Дата получения (в формате YYYY-MM-DD)
#     level = Column(String, nullable=False)           # Степень (например: «1 место», «участник», и т.п.)
#     status = Column(String, nullable=False)         # Статус мероприятия (например: международный, всероссийский и т.п.)
#     file_path = Column(String, nullable=False)       # Путь к файлу (PDF, фото и т.п.)

#     # Привязка к студенту
#     student_id = Column(Integer, ForeignKey("students.id"))
#     student = relationship("Student", back_populates="achievements")

# Модель администратора
# class Admin(Base):
#     __tablename__ = "admins"

#     id = Column(Integer, primary_key=True)
#     login = Column(String, unique=True, nullable=False)  # Логин
#     password_hash = Column(String, nullable=False)       # Хэш пароля

# Функция создания базы и базового админа
def init_db():
    Base.metadata.create_all(engine)  # Создание всех таблиц


    # session = Session()
    # # Добавляем админа, если его нет
    # if not session.query(Admin).first():
    #     hashed_pw = pwd_context.hash("admin")
    #     admin = Admin(login="admin", password_hash=hashed_pw)
    #     session.add(admin)
    #     session.commit()
    # session.close()

init_db()