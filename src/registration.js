import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";

function FillArea({ id, type, text }) {
  return (
    <div>
      <h3>{text}</h3>
      <input id={id} type={type} onChange={() => {}} />
    </div>
  );
}

function Registration() {
  const navigate = useNavigate();

  const [animate, setAnimate] = useState(false);
  const [closeAnimate, setCloseAnimate] = useState(false);

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
    <div id="registration" className={`slide-reg ${animate ? "slide-in" : ""} ${closeAnimate ? "slide-out" : ""}`}>
      <h1>Регистрация</h1>
      <div className="box-reg">
        <FillArea id="firstName" type="text" text="Имя" />
        <FillArea id="secondName" type="text" text="Фамилия" />
        <FillArea id="thirdName" type="text" text="Отчество (при наличии)" />
        <FillArea id="birthday" type="date" text="Дата рождения" />
        <FillArea id="number" type="text" text="Номер зачётки" />
        <FillArea id="create_login" type="text" text="Придумайте логин" />
        <FillArea id="create_password" type="text" text="Придумайте пароль" />
        <button>Создать аккаунт</button>
        <button className={`link-style`} onClick={handleClickAut}>
          У меня уже есть аккаунт
        </button>
      </div>
    </div>
  );
}

export default Registration;
