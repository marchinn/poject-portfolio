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
  return (
    <div id="autorization">
      <h1>Авторизация</h1>

      <FillArea id="login" type="text" text="Логин" />
      <FillArea id="password" type="text" text="Пароль" />

      <button className="link-style">У меня нет аккаунта</button>
    </div>
  );
}

export default Autorization;