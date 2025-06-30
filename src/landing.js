import "./landing.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  const [slid, setSlid] = useState(false);

  const handleClickReg = () => {
    setSlid(true);
    setTimeout(() => {
      navigate("/registration");
    }, 1000);
  };

    const handleClickAut = () => {
    setSlid(true);
    setTimeout(() => {
      navigate("/autorization");
    }, 1000);
  };
  return (
    <div id="window">
      <div className={`box ${slid ? "slide-right" : ""}`}>
        <h1>Студенческое портфолио</h1>
        <p>
          Цифровое портфолио будет хранить все достижения,
          <br /> награды и информацию об участии и выигрыше в созтязаниях
        </p>
        <button class="one" onClick={handleClickReg}>
          Создать
        </button>
        <button class="two" onClick={handleClickAut}>
          Войти
        </button>
      </div>
    </div>
  );
}

export default Landing;
