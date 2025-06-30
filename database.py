from sqlalchemy import Column, Integer, String, ForeignKey, create_engine
from sqlalchemy.orm import declarative_base, relationship, sessionmaker

# Подключение к SQLite-базе данных
engine = create_engine(
    "sqlite:///C:/ratra/Desktop/SQL/notes.db",  # Путь к файлу базы
    echo=False,  # Не выводить SQL-запросы в консоль
    connect_args={"check_same_thread": False}  # Обход ограничения SQLite для работы с FastAPI
)

# Базовый класс для всех моделей
Base = declarative_base()

# Сессия — объект для работы с БД (чтение, запись и т.д.)
Session = sessionmaker(bind=engine, autoflush=False, autocommit=False)

# Модель студента
class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True)  # Уникальный ID
    last_name = Column(String, nullable=False)  # Фамилия
    first_name = Column(String, nullable=False)  # Имя
    patronymic = Column(String)  # Отчество (необязательно)
    date_of_birth = Column(String, nullable=False)  # Дата рождения (формат "YYYY-MM-DD")
    student_id_number = Column(String, unique=True, nullable=False)  # Номер студбилета

    # Связь: один студент — много достижений
    achievements = relationship("Achievement", back_populates="student")

# Модель достижения
class Achievement(Base):
    __tablename__ = "achievements"

    id = Column(Integer, primary_key=True)  # Уникальный ID
    title = Column(String, nullable=False)  # Название достижения
    file_path = Column(String, nullable=False)  # Путь к файлу (PDF/фото)

    student_id = Column(Integer, ForeignKey("students.id"))  # Внешний ключ на студента
    student = relationship("Student", back_populates="achievements")  # Обратная связь

# Модель администратора
class Admin(Base):
    __tablename__ = "admins"

    id = Column(Integer, primary_key=True)  # Уникальный ID
    login = Column(String, unique=True, nullable=False)  # Логин
    password = Column(String, nullable=False)  # Пароль

# Функция инициализации базы данных
def init_db():
    Base.metadata.create_all(engine)  # Создаёт таблицы, если их нет

    session = Session()
    if not session.query(Admin).first():  # Если админ ещё не добавлен
        admin = Admin(login="admin", password="admin")  # Создаём базового админа
        session.add(admin)
        session.commit()
    session.close()
