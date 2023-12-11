import { Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import Board from "./pages/boards/Board";
import User from "./pages/users/User";
import Auth from "./pages/auth/Auth";
import Admin from "./pages/Admin";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/boards" element={<Board />} />
        <Route path="/users" element={<User />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
