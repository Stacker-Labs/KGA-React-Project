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
import Header from "./components/organisms/Header";
import UserEdit from "./pages/users/UserEdit";
import TagItem from "./pages/TagItem";
import { useResetMenu } from "./hooks/useResetMenu";
import Logout from "./pages/auth/Logout";
import { useRecoilValue } from "recoil";
import { darkModeState } from "./recoil/darkmode";
import { useEffect } from "react";
import NotFound from "./pages/NotFound";
import useRenewCookie from "./hooks/useRenewCookie";

function App() {
  const darkMode = useRecoilValue(darkModeState);

  useRenewCookie(5000);
  useResetMenu();

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    return () => {
      document.body.classList.remove("dark");
    };
  }, [darkMode]);

  return (
    <>
      <CssBaseline />
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/search/:id" element={<Search />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/tags/:id" element={<TagItem />} />
          <Route path="/boards" element={<Board />} />
          <Route path="/boards/:id" element={<View />} />
          <Route path="/boards/:id/edit" element={<Modify />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/users/:id/edit" element={<UserEdit />} />
          <Route path="/auth">
            <Route index element={<Login />} />
            <Route path="github/callback" element={<Github />} />
            <Route path="google/callback" element={<Google />} />
            <Route path="kakao/callback" element={<Kakao />} />
            <Route path="register" element={<Register />} />
            <Route path="logout" element={<Logout />} />
          </Route>
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
