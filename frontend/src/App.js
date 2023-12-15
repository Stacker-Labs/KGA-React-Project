import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Board from "./pages/boards/Board";
import View from "./pages/boards/BoardCom/View";
import Modify from "./pages/boards/BoardCom/Modify";
import User from "./pages/users/User";
import Login from "./pages/auth/Login";
import Admin from "./pages/Admin";
import CssBaseline from "@mui/material/CssBaseline";
import Github from "./pages/auth/Github";
import Google from "./pages/auth/Google";
import Kakao from "./pages/auth/Kakao";
import Register from "./pages/auth/Register";
import Tags from "./pages/Tags";
import Search from "./pages/Search";

function App() {
  return (
    <>
      <CssBaseline />
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/search" element={<Search />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/boards" element={<Board />} />
          <Route path="/boards/:id" element={<View />} />
          <Route path="/boards/:id/edit" element={<Modify />} />
          <Route path="/users" element={<User />} />
          <Route path="/auth">
            <Route index element={<Login />} />
            <Route path="github/callback" element={<Github />} />
            <Route path="google/callback" element={<Google />} />
            <Route path="kakao/callback" element={<Kakao />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
