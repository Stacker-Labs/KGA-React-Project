import React, { useEffect, useState } from "react";
import Header from "../components/organisms/Header";
import Sidebar from "../components/organisms/Sidebar";
import MainContent from "../components/organisms/MainContent";
import ChatContent from "../components/organisms/ChatContent";
import axios from "axios";

const Main = () => {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    const boardData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_SERVER}/page/1`
        );
        setBoard(response.data.boards);
        console.log(response.data.boards);
      } catch (error) {
        console.log(`error :`, error);
      }
    };
    boardData();
  }, []);
  console.log(board);
  return (
    <>
      <Header />
      <div className="flex w-full items-stretch">
        <Sidebar />
        <MainContent board={board} />
        <ChatContent />
      </div>
    </>
  );
};

export default Main;
