import { Link } from "react-router-dom";
import Notes from "./notes";
import "./App.css";

function FillArea({ id, type, text }) {
  return (
    <div>
      <h3>{text}</h3>
      <input id={id} type={type} onChange={""} />
    </div>
  );
}

const tasks = ["проверить почту", "позвонить", "почитать"];
function Autorization() {
  return (
    <div id="autorization">
      <h1>Регистрация</h1>

      <FillArea id="firstName" type="text" text="Имя" />
      <FillArea id="secondName" type="text" text="Фамилия" />
      <FillArea id="thirdName" type="text" text="Отчество (при наличии)" />
      <FillArea id="birthday" type="date" text="Дата рождения" />
      <FillArea id="number" type="text" text="Номер зачётки" />

      <Link to="/mypage">У меня уже есть аккаунт</Link>
    </div>
  );
}

export default Autorization;
