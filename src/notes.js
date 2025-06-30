import { useEffect, useState } from "react";

function Notes() {
  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // пример без fetch, если нет сервера
    setNotes(["первое", "второе"]);
    
    // Если будет сервер:
    // fetch("https://localhost:3000/notes")
    //   .then((res) => res.json())
    //   .then((data) => setNotes(data));
  }, []);

  function handleChange(event) {
    setText(event.target.value);
  }

  function handleAdd() {
    if (text.trim() === "") return;
    setNotes([...notes, text]);
    setText("");
  }

  return (
    <div>
      <h2>My Notes</h2>
      <input type="text" value={text} onChange={handleChange} />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {notes.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ul>
    </div>
  );
}

export default Notes;
