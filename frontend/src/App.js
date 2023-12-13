import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Board from "./pages/boards/Board";
import View from "./pages/boards/BoardCom/View";
import User from "./pages/users/User";
import Login from "./pages/auth/Login";
import Admin from "./pages/Admin";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  return (
    <>
      <CssBaseline />
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/boards" element={<Board />} />
          <Route path="/boards/:id" element={<View />} />
          <Route path="/users" element={<User />} />
          <Route path="/auth" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
