import { useState } from "react";
import "./userpage.css";

function UserPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [achievementData, setAchievementData] = useState({
    title: "",
    date_received: "",
    level: "",
    status: "",
    file: null
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setAchievementData(prev => ({ ...prev, [id]: value }));
  };
  const handleFileChange = (e) => {
    setAchievementData(prev => ({ ...prev, file: e.target.files[0] }));
  };

  const submitAchievement = async () => {
    // Готовим форму с данными
    const formData = new FormData();
    formData.append("title", achievementData.title);
    formData.append("date_received", achievementData.date_received);
    formData.append("level", achievementData.level);
    formData.append("status", achievementData.status);
    formData.append("file", achievementData.file);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/achievements", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + token
        },
        body: formData
      });
      if (response.ok) {
        alert("Достижение добавлено");
        closeModal();
      } else {
        alert("Ошибка добавления");
      }
    } catch (error) {
      alert("Ошибка сети");
    }
  };

  return (
    <div id="userpage">
      <nav>
        <h1>Личный кабинет</h1>
        <div className="flex"></div>
        <a href="/autorization">Выйти</a>
      </nav>
      <button onClick={openModal}>Добавить достижение</button>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Новое достижение</h3>
            <input id="title" type="text" placeholder="Название" onChange={handleChange} />
            <input id="date_received" type="date" placeholder="Дата" onChange={handleChange} />
            <input id="level" type="text" placeholder="Степень/место" onChange={handleChange} />
            <input id="status" type="text" placeholder="Статус" onChange={handleChange} />
            <input id="file" type="file" onChange={handleFileChange} />
            <button onClick={submitAchievement}>Отправить</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserPage;
