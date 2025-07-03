import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";

function FillArea({ id, type, text, value, onChange }) {
  return (
    <div>
      <h3>{text}</h3>
      <input id={id} type={type} value={value} onChange={onChange} />
    </div>
  );
}

function Registration() {
  const navigate = useNavigate();

  const [animate, setAnimate] = useState(false);
  const [closeAnimate, setCloseAnimate] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    third_name: "",
    date_of_birth: "",
    student_id_number: "",
    login: "",
    password: "",
  });

  // Обработка изменения полей
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Отправка формы на сервер
  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:8000/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Регистрация прошла успешно!");
        navigate("/autorization");
      } else {
        const err = await response.json();
        alert("Ошибка регистрации: " + err.detail);
      }
    } catch (err) {
      console.error("Сетевая ошибка:", err);
      alert("Ошибка сети. Попробуйте позже.");
    }
  };

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleClickAut = () => {
    setCloseAnimate(true);
    setTimeout(() => {
      navigate("/autorization");
    }, 1000);
  };

  return (
    <div
      id="registration"
      className={`slide-reg ${animate ? "slide-in" : ""} ${
        closeAnimate ? "slide-out" : ""
      }`}
    >
      <h1>Регистрация</h1>
      <div className="box-reg">
        <FillArea
          id="last_name"
          type="text"
          text="Фамилия"
          value={formData.last_name}
          onChange={handleChange}
        />
        <FillArea
          id="first_name"
          type="text"
          text="Имя"
          value={formData.first_name}
          onChange={handleChange}
        />
        <FillArea
          id="third_name"
          type="text"
          text="Отчество (при наличии)"
          value={formData.third_name}
          onChange={handleChange}
        />
        <FillArea
          id="date_of_birth"
          type="date"
          text="Дата рождения"
          value={formData.date_of_birth}
          onChange={handleChange}
        />
        <FillArea
          id="student_id_number"
          type="text"
          text="Номер зачётки"
          value={formData.student_id_number}
          onChange={handleChange}
        />
        <FillArea
          id="login"
          type="text"
          text="Логин"
          value={formData.login}
          onChange={handleChange}
        />
        <FillArea
          id="password"
          type="password"
          text="Пароль"
          value={formData.password}
          onChange={handleChange}
        />
        <button onClick={handleRegister}>Создать аккаунт</button>
        <button className={`link-style`} onClick={handleClickAut}>
          У меня уже есть аккаунт
        </button>
      </div>
    </div>
  );
}

export default Registration;
