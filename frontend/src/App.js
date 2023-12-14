import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Board from "./pages/boards/Board";
import View from "./pages/boards/BoardCom/View";
import User from "./pages/users/User";
import Login from "./pages/auth/Login";
import Admin from "./pages/Admin";
import Signup from "./pages/auth/Signup";
import CssBaseline from "@mui/material/CssBaseline";
import Github from "./pages/auth/Github";
import Google from "./pages/auth/Google";
import Kakao from "./pages/auth/Kakao";

function App() {
  return (
    <>
      <CssBaseline />
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/boards" element={<Board />} />
          <Route path="/boards/:id" element={<View />} />
          <Route path="/boards/:id/edit" />
          <Route path="/users" element={<User />} />
          <Route path="/auth">
            <Route index element={<Login />} />
            <Route path="github/callback" element={<Github />} />
            <Route path="google/callback" element={<Google />} />
            <Route path="kakao/callback" element={<Kakao />} />
            <Route path="register" element={<Signup />} />
          </Route>
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
