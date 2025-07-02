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
    firstName: "",
    secondName: "",
    thirdName: "",
    birthday: "",
    number: "",
    create_login: "",
    create_password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:3000/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const result = await response.json();
        console.log("Успешно зарегистрирован:", result);
      } else {
        console.error("Ошибка регистрации");
      }
    } catch (err) {
      console.error("Сетевая ошибка:", err);
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
          id="firstName"
          type="text"
          text="Имя"
          value={formData.firstName}
          onChange={handleChange}
        />
        <FillArea
          id="secondName"
          type="text"
          text="Фамилия"
          value={formData.secondName}
          onChange={handleChange}
        />
        <FillArea
          id="thirdName"
          type="text"
          text="Отчество (при наличии)"
          value={formData.thirdName}
          onChange={handleChange}
        />
        <FillArea
          id="birthday"
          type="date"
          text="Дата рождения"
          value={formData.birthday}
          onChange={handleChange}
        />
        <FillArea
          id="number"
          type="text"
          text="Номер зачётки"
          value={formData.number}
          onChange={handleChange}
        />
        <FillArea
          id="create_login"
          type="text"
          text="Придумайте логин"
          value={formData.create_login}
          onChange={handleChange}
        />
        <FillArea
          id="create_password"
          type="password"
          text="Придумайте пароль"
          value={formData.create_password}
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
