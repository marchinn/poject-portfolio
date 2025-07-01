import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";

function FillArea({ id, type, text }) {
  return (
    <div>
      <h3>{text}</h3>
      <input id={id} type={type} onChange={""} />
    </div>
  );
}

function Autorization() {
  const navigate = useNavigate();

  const [animate, setAnimate] = useState(false);
  const [closeAnimate, setCloseAnimate] = useState(false);

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
    <div id="autorization" className={`slide-reg ${animate ? "slide-in" : ""} ${closeAnimate ? "slide-out" : ""}`}>
      <h1>Авторизация</h1>

      <FillArea id="login" type="text" text="Логин" />
      <FillArea id="password" type="text" text="Пароль" />

      <button className={`link-style`} style={{marginTop: 25 }} onClick={handleClickReg}>
        У меня нет аккаунта
      </button>
    </div>
  );
}

export default Autorization;
