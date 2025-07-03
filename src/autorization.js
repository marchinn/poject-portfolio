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
  const [loginData, setLoginData] = useState({ login: "", password: "" });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setLoginData(prev => ({ ...prev, [id]: value }));
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8000/authorization", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const result = await response.json();
        // Сохраняем токен и переходим на личный кабинет
        localStorage.setItem("token", result.access_token);
        navigate("/mypage");
      } else {
        alert("Неверный логин или пароль");
      }
    } catch (err) {
      alert("Ошибка сети");
    }
  };

  useEffect(() => { /* Анимация при появлении */ }, []);

  return (
    <div className="autorization">
      <h1>Авторизация</h1>
      <FillArea id="login" type="text" text="Логин" value={loginData.login} onChange={handleChange} />
      <FillArea id="password" type="password" text="Пароль" value={loginData.password} onChange={handleChange} />
      <button onClick={handleLogin}>Войти</button>
    </div>
  );
}

export default Autorization;
