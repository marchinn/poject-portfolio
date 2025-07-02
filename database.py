from sqlalchemy import Column, Integer, String, ForeignKey, Date, create_engine
from sqlalchemy.orm import declarative_base, relationship, sessionmaker

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
    third_name = Column(String)                      # Отчество (необяз.)
    date_of_birth = Date(String, nullable=False)   # Дата рождения
    student_id_number = Column(String, unique=True, nullable=False)  # Номер студенческого билета
    login = Column(String, unique=True, nullable=False)              # Придуманный логин
    password_hash = Column(String, nullable=False)                   # Хэш придуманного пароля

    # Один студент может иметь много достижений
    achievements = relationship("Achievement", back_populates="student")

#  Модель достижения
class Achievement(Base):
    __tablename__ = "achievements"

    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)           # Название достижения
    date_received = Date(String, nullable=False)   # Дата получения (в формате YYYY-MM-DD)
    level = Column(String, nullable=False)           # Степень (например: «1 место», «участник», и т.п.)
    status = Column(String, nullable=False)         # Статус мероприятия (например: международный, всероссийский и т.п.)
    file_path = Column(String, nullable=False)       # Путь к файлу (PDF, фото и т.п.)

    # Привязка к студенту
    student_id = Column(Integer, ForeignKey("students.id"))
    student = relationship("Student", back_populates="achievements")

# Модель администратора
class Admin(Base):
    __tablename__ = "admins"

    id = Column(Integer, primary_key=True)
    login = Column(String, unique=True, nullable=False)  # Логин
    password_hash = Column(String, nullable=False)       # Хэш пароля

# Функция создания базы и базового админа
def init_db():
    Base.metadata.create_all(engine)  # Создание всех таблиц

    session = Session()
    # Добавляем админа, если его нет
    if not session.query(Admin).first():
        admin = Admin(login="admin", password="admin")  # Заранее заданные данные
        session.add(admin)
        session.commit()
    session.close()
