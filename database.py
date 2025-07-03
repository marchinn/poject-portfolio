from sqlalchemy import Column, Integer, String, ForeignKey, Date, create_engine
from sqlalchemy.orm import declarative_base, relationship, sessionmaker
from datetime import date

# Подключение к SQLite-базе данных (файл notes.db в текущей директории)
engine = create_engine(
    "sqlite:///./notes.db",
    echo=False,
    connect_args={"check_same_thread": False}
)

Base = declarative_base()
Session = sessionmaker(bind=engine, autoflush=False, autocommit=False)

# Модель студента
class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True)
    last_name = Column(String, nullable=False)        # Фамилия
    first_name = Column(String, nullable=False)       # Имя
    third_name = Column(String)                       # Отчество (необяз.)
    date_of_birth = Column(Date, nullable=False)      # Дата рождения
    student_id_number = Column(String, unique=True, nullable=False)  # Номер зачётки
    login = Column(String, unique=True, nullable=False)              # Логин
    password_hash = Column(String, nullable=False)                  # Хеш пароля

    achievements = relationship("Achievement", back_populates="student")

# Модель достижения
class Achievement(Base):
    __tablename__ = "achievements"

    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)      # Название достижения
    date_received = Column(Date, nullable=False)# Дата получения
    level = Column(String, nullable=False)      # Степень (напр., «1 место», «участник»)
    status = Column(String, nullable=False)     # Статус (напр., «международный», «всероссийский»)
    file_path = Column(String, nullable=False)  # Путь к файлу

    student_id = Column(Integer, ForeignKey("students.id"))
    student = relationship("Student", back_populates="achievements")

# Модель администратора
class Admin(Base):
    __tablename__ = "admins"

    id = Column(Integer, primary_key=True)
    login = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)

# # Создание аккаунта администратора
# admin = Admin(
#     login="admin",
#     password_hash="admin123"
# )

# # Создание студента
# student = Student(
#     last_name="Иванов",
#     first_name="Иван",
#     third_name="Иванович",
#     date_of_birth=date(2000, 5, 15),
#     student_id_number="A123456",
#     login="ivanov_student",
#     password_hash="student123"
# )

# # Добавление в сессию и коммит
# Session.add(admin)
# Session.add(student)
# Session.commit()
