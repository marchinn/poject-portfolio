import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";

function FillArea({ id, type, text, value, onChange}) {
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
    const { id, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/autorization", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Успешный вход:", result);
      } else {
        console.error("Ошибка входа");
      }
    } catch (err) {
      console.error("Сетевая ошибка:", err);
    }
  };

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
