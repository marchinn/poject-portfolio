import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Registration from "./registration";
import UserPage from "./userpage";
import Landing from "./landing";
import Autorization from "./autorization";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/autorization" element={<Autorization />} />
          <Route path="/mypage" element={<UserPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
