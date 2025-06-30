import { Link } from "react-router-dom";
import "./App.css";

function UserPage() {
  return (
    <div>
      <h1>UserPage</h1>
      <Link to="/">Authorization is here</Link>

      <div className="wrapper">
        <div className="half">
          <div
            className="photo"
            style={{
              width: "300px",
              height: "500px",
              backgroundColor: "grey",
              margin: "0 auto",
            }}
          ></div>
          <h3>Фамилия</h3>
          <h3>Имя</h3>
          <h3>Отчество</h3>
          <h3>Дата рождения</h3>
          <h3>Номер зачётки</h3>
        </div>

        <div className="half">
          <div className="box">
            <div>
              <h3>Мои достижения</h3>
              <input type="file" />
              <button>Добавить</button>
            </div>

            <div className="field"></div>
          </div>

          <div className="box">
            <div>
              <h3>Загруженные файлы</h3>
              <input type="file" />
              <button>Загрузить</button>
            </div>

            <div className="field"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
