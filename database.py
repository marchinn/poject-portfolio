from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, create_engine
from sqlalchemy.orm import declarative_base, relationship, sessionmaker
from datetime import datetime

# Подключение к SQLite-базе данных
engine = create_engine(
    "sqlite:///C:/ratra/Desktop/SQL/notes.db",  # Путь к файлу базы
    echo=False,
    connect_args={"check_same_thread": False}
)

# Базовый класс SQLAlchemy
Base = declarative_base()

# Сессия для работы с БД
Session = sessionmaker(bind=engine, autoflush=False, autocommit=False)

#  Модель студента
class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True)
    last_name = Column(String, nullable=False)       # Фамилия
    first_name = Column(String, nullable=False)      # Имя
    patronymic = Column(String)                      # Отчество (необяз.)
    date_of_birth = Column(String, nullable=False)   # Дата рождения
    student_id_number = Column(String, unique=True, nullable=False)  # Студбилет
    login = Column(String, unique=True, nullable=False)              # Придуманный логин
    password = Column(String, nullable=False)                       # Придуманный пароль

    # Один студент может иметь много достижений
    achievements = relationship("Achievement", back_populates="student")

#  Модель достижения
class Achievement(Base):
    __tablename__ = "achievements"

    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)           # Название достижения
    date_received = Column(String, nullable=False)   # Дата получения (в формате YYYY-MM-DD)
    level = Column(String, nullable=False)           # Степень (например: «1 место», «участник», и т.п.)
    file_path = Column(String, nullable=False)       # Путь к файлу (PDF, фото и т.п.)

    # Привязка к студенту
    student_id = Column(Integer, ForeignKey("students.id"))
    student = relationship("Student", back_populates="achievements")

# Модель администратора
class Admin(Base):
    __tablename__ = "admins"

    id = Column(Integer, primary_key=True)
    login = Column(String, unique=True, nullable=False)  # Логин
    password = Column(String, nullable=False)            # Пароль

# Функция создания базы и базового админа
def init_db():
    Base.metadata.create_all(engine)  # Создание всех таблиц

    session = Session()
    # Добавляем админа, если его нет
    if not session.query(Admin).first():
        admin = Admin(login="admin", password="admin123")  # Заранее заданные данные
        session.add(admin)
        session.commit()
    session.close()
