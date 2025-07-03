import { useState } from "react";
import "./userpage.css";

function FillArea({ id, type, text }) {
  return (
    <div>
      <h3>{text}</h3>
      <input id={id} type={type} onChange={() => {}} />
    </div>
  );
}

function UserPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const modalContentClick = (e) => {
    e.stopPropagation();
    const achievements = [];
  };

  return (
    <div id="userpage">
      <nav>
        <h1>UserPage</h1>
        <div className="flex"></div>
        <a href="/autorization">Выйти</a>
      </nav>

      <div className="wrapper-up">
        <div className="half-up">
          <div className="photo-up">
            <input type="file" />
          </div>
          <h3>Фамилия</h3>
          <h3>Имя</h3>
          <h3>Отчество</h3>
          <h3>Дата рождения</h3>
          <h3>Номер зачётки</h3>
        </div>

        <div className="half-up">
          <div className="box-up">
            <div className="box-in-box-up">
              <h3>Мои достижения</h3>
              <button id="add-competition" onClick={openModal}>
                Добавить
              </button>
            </div>
            <div className="field"></div>

            {isModalOpen && (
              <div className="modal-overlay" onClick={closeModal}>
                <div className="modal-content" onClick={modalContentClick}>
                  <FillArea id="competition" type="text" text="Конкурс" />
                  <FillArea
                    id="date-competition"
                    type="date"
                    text="Дата проведения"
                  />
                  <FillArea id="status" type="text" text="Статус\место" />
                </div>
              </div>
            )}
          </div>

          <div className="box-up">
            <div className="box-in-box-up">
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
