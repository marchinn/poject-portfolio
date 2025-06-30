import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Autorization from "./autorization";
import UserPage from "./userpage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <Link to="/mypage">Личный кабинет</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Autorization />} />
          <Route path="/mypage" element={<UserPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
