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

function Autorization() {
  const navigate = useNavigate();

  const [animate, setAnimate] = useState(false);
  const [closeAnimate, setCloseAnimate] = useState(false);

  const [loginData, setLoginData] = useState({
    login: "",
    password: "",
  });
  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  async function handleLogin() {
    const formData = new FormData();
    formData.append("login", loginData.login);
    formData.append("password", loginData.password);
console.log(formData)
    try {
      const response = await fetch("http://localhost:8000/autorization", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.log("Ответ сервера:", response.status); // <--- Добавь
        throw new Error("Ошибка: " + response.status);
      }

      const data = await response.json();
      console.log("Успешно:", data);
    } catch (error) {
      console.error("Ошибка запроса:", error);
    }
  }

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleClickReg = () => {
    setCloseAnimate(true);

    setTimeout(() => {
      navigate("/registration");
    }, 1000);
  };

  return (
    <div
      id="autorization"
      className={`slide-reg ${animate ? "slide-in" : ""} ${
        closeAnimate ? "slide-out" : ""
      }`}
    >
      <h1>Авторизация</h1>

      <FillArea
        id="login"
        type="text"
        text="Логин"
        value={loginData.login}
        onChange={handleChange}
      />
      <FillArea
        id="password"
        type="password"
        text="Пароль"
        value={loginData.password}
        onChange={handleChange}
      />
      <button onClick={handleLogin}>Войти</button>
      <button
        className={`link-style`}
        style={{ marginTop: 25 }}
        onClick={handleClickReg}
      >
        У меня нет аккаунта
      </button>
    </div>
  );
}

export default Autorization;
